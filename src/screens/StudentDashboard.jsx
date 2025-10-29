import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getStoredSession } from '../api'

const API_BASE = import.meta.env.VITE_AUTH_API ?? '/api'

function buildTree(folders) {
  const map = new Map()
  folders.forEach((folder) => {
    map.set(folder.id, { ...folder, children: [] })
  })

  map.forEach((folder) => {
    if (folder.parent && map.has(folder.parent)) {
      map.get(folder.parent).children.push(folder)
    }
  })

  const roots = []
  map.forEach((folder) => {
    if (!folder.parent || !map.has(folder.parent)) {
      roots.push(folder)
    }
  })

  function sortNodes(nodes) {
    nodes.sort((a, b) => {
      const orderDiff = (a.order ?? 0) - (b.order ?? 0)
      if (orderDiff !== 0) return orderDiff
      return (a.name || '').localeCompare(b.name || '')
    })
    nodes.forEach((node) => sortNodes(node.children))
  }

  sortNodes(roots)
  return roots
}

function detectFileType(file) {
  const type = (file?.type || '').toLowerCase()
  if (type) return type
  const url = file?.url || ''
  if (!url) return 'file'
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'video'
  const extensionMatch = url.match(/\.([a-z0-9]+)(?:\?|#|$)/i)
  if (extensionMatch) {
    const ext = extensionMatch[1].toLowerCase()
    if (ext === 'pdf') return 'pdf'
    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) return 'image'
    if (['ppt', 'pptx', 'key'].includes(ext)) return 'slides'
    if (['doc', 'docx', 'pages', 'rtf'].includes(ext)) return 'doc'
    if (['xls', 'xlsx', 'numbers', 'csv'].includes(ext)) return 'sheet'
  }
  return 'file'
}

const FILE_TYPE_META = {
  pdf: { label: 'PDF', badgeClass: 'bg-red-100 text-red-600 border-red-200', icon: '📄' },
  image: { label: 'Immagine', badgeClass: 'bg-orange-100 text-orange-600 border-orange-200', icon: '🖼️' },
  video: { label: 'Video', badgeClass: 'bg-purple-100 text-purple-600 border-purple-200', icon: '🎬' },
  slides: { label: 'Slides', badgeClass: 'bg-blue-100 text-blue-600 border-blue-200', icon: '📊' },
  doc: { label: 'Documento', badgeClass: 'bg-emerald-100 text-emerald-600 border-emerald-200', icon: '📝' },
  sheet: { label: 'Foglio', badgeClass: 'bg-sky-100 text-sky-600 border-sky-200', icon: '📈' },
  file: { label: 'File', badgeClass: 'bg-slate-100 text-slate-600 border-slate-200', icon: '📁' },
}

function FileBadge({ file }) {
  const type = detectFileType(file)
  const meta = FILE_TYPE_META[type] ?? FILE_TYPE_META.file
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${meta.badgeClass}`}
    >
      <span>{meta.icon}</span>
      <span>{meta.label}</span>
    </span>
  )
}

function FolderNode({ node, depth, onSelect, selectedId }) {
  const isActive = node.id === selectedId
  return (
    <div>
      <button
        type="button"
        onClick={() => onSelect(node.id)}
        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isActive
            ? 'bg-binavy text-white focus:ring-binavy'
            : 'text-slate-600 hover:bg-slate-100 focus:ring-slate-300'
        }`}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        <span className="font-medium">{node.name || 'Cartella senza nome'}</span>
        <span className="text-xs text-slate-400">{node.children.length}</span>
      </button>
      {node.children.length > 0 && (
        <div className="mt-1 space-y-1">
          {node.children.map((child) => (
            <FolderNode
              key={child.id}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return
    const timeout = setTimeout(onClose, 4000)
    return () => clearTimeout(timeout)
  }, [toast, onClose])

  if (!toast) return null

  const toneClass = toast.tone === 'error' ? 'bg-red-600' : 'bg-emerald-600'

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 flex justify-center px-4">
      <div
        className={`pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white shadow-lg ${toneClass}`}
      >
        <span>{toast.message}</span>
      </div>
    </div>
  )
}

export default function StudentDashboard() {
  const navigate = useNavigate()
  const session = useMemo(() => getStoredSession(), [])
  const token = session?.token
  const studentName = session?.name || ''
  const [folders, setFolders] = useState([])
  const [files, setFiles] = useState([])
  const [selectedFolderId, setSelectedFolderId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)

  const folderMap = useMemo(() => {
    const map = new Map()
    folders.forEach((folder) => {
      map.set(folder.id, folder)
    })
    return map
  }, [folders])

  const tree = useMemo(() => buildTree(folders), [folders])

  const breadcrumb = useMemo(() => {
    if (!selectedFolderId) return []
    const trail = []
    let currentId = selectedFolderId
    const visited = new Set()
    while (currentId && folderMap.has(currentId) && !visited.has(currentId)) {
      visited.add(currentId)
      const folder = folderMap.get(currentId)
      trail.push(folder)
      currentId = folder?.parent
    }
    return trail.reverse()
  }, [folderMap, selectedFolderId])

  const filteredFiles = useMemo(() => {
    if (!selectedFolderId) return []
    return files
      .filter((file) => file.folder === selectedFolderId)
      .sort((a, b) => {
        const orderDiff = (a.order ?? 0) - (b.order ?? 0)
        if (orderDiff !== 0) return orderDiff
        return (a.name || '').localeCompare(b.name || '')
      })
  }, [files, selectedFolderId])

  const selectFolder = useCallback((folderId) => {
    setSelectedFolderId(folderId)
  }, [])

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    let active = true

    async function loadTree() {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(`${API_BASE}/content/tree`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 401 || response.status === 403) {
          navigate('/login', { replace: true })
          return
        }

        let payload = null
        try {
          payload = await response.json()
        } catch (parseError) {
          payload = null
        }

        if (!response.ok) {
          console.error('Content tree request failed', response.status, payload)
          const message = payload?.error || 'Impossibile recuperare i contenuti.'
          if (response.status >= 500) {
            setToast({ message: 'Errore del server. Riprova più tardi.', tone: 'error' })
          }
          if (active) {
            setError(message)
            setFolders([])
            setFiles([])
          }
          return
        }

        if (!active) return

        const apiFolders = Array.isArray(payload?.folders) ? payload.folders : []
        const apiFiles = Array.isArray(payload?.files) ? payload.files : []
        setFolders(apiFolders)
        setFiles(apiFiles)
      } catch (error) {
        console.error('Unable to load student content tree', error)
        if (active) {
          setError('Connessione non disponibile. Riprova più tardi.')
          setFolders([])
          setFiles([])
          setToast({ message: 'Connessione non disponibile.', tone: 'error' })
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadTree()

    return () => {
      active = false
    }
  }, [navigate, token])

  useEffect(() => {
    if (folders.length === 0) {
      setSelectedFolderId(null)
      return
    }

    setSelectedFolderId((prev) => {
      if (prev && folders.some((folder) => folder.id === prev)) {
        return prev
      }

      const candidates = folders
        .filter((folder) => !folder.parent)
        .sort((a, b) => {
          const orderDiff = (a.order ?? 0) - (b.order ?? 0)
          if (orderDiff !== 0) return orderDiff
          return (a.name || '').localeCompare(b.name || '')
        })

      if (candidates.length > 0) {
        return candidates[0].id
      }

      return folders[0].id
    })
  }, [folders])

  const handleCopyLink = useCallback(async (url) => {
    if (!url) return
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        setToast({ message: 'Link copiato negli appunti!', tone: 'success' })
      } else {
        throw new Error('Clipboard API non disponibile')
      }
    } catch (error) {
      console.error('Copy file link failed', error)
      setToast({ message: 'Impossibile copiare il link. Copia manualmente.', tone: 'error' })
    }
  }, [])

  const closeToast = useCallback(() => setToast(null), [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Toast toast={toast} onClose={closeToast} />
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Area Studente</h1>
        <p className="mt-3 text-slate-600">
          {studentName
            ? `Ciao ${studentName}, esplora i materiali condivisi con te dalla tua scuola.`
            : 'Accedi ai materiali condivisi con gli studenti della tua scuola.'}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm text-binavy">
          <span>Vuoi uscire?</span>
          <Link to="/logout" className="font-semibold underline">
            Logout
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[260px,1fr]">
        <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="px-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Cartelle
          </h2>
          {loading ? (
            <p className="mt-4 px-2 text-sm text-slate-500">Caricamento cartelle…</p>
          ) : folders.length === 0 ? (
            <p className="mt-4 px-2 text-sm text-slate-500">
              Nessuna cartella disponibile al momento.
            </p>
          ) : (
            <div className="mt-3 space-y-1">
              {tree.map((node) => (
                <FolderNode
                  key={node.id}
                  node={node}
                  depth={0}
                  onSelect={selectFolder}
                  selectedId={selectedFolderId}
                />
              ))}
            </div>
          )}
        </aside>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-label="Percorso cartella">
                {breadcrumb.length === 0 ? (
                  <span className="font-medium text-slate-700">Seleziona una cartella</span>
                ) : (
                  breadcrumb.map((folder, index) => (
                    <React.Fragment key={folder.id}>
                      <button
                        type="button"
                        onClick={() => selectFolder(folder.id)}
                        className={`rounded-md px-2 py-1 transition ${
                          index === breadcrumb.length - 1
                            ? 'bg-binavy text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {folder.name || 'Cartella'}
                      </button>
                      {index !== breadcrumb.length - 1 && <span className="text-slate-300">/</span>}
                    </React.Fragment>
                  ))
                )}
              </nav>
              {selectedFolderId && folderMap.get(selectedFolderId)?.description && (
                <p className="mt-2 text-sm text-slate-500">
                  {folderMap.get(selectedFolderId).description}
                </p>
              )}
            </div>
            <div className="text-xs uppercase tracking-widest text-slate-400">
              {filteredFiles.length}{' '}
              {filteredFiles.length === 1 ? 'file disponibile' : 'file disponibili'}
            </div>
          </div>

          {error && !loading ? (
            <div
              role="alert"
              className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          ) : loading ? (
            <div className="mt-6 space-y-3">
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
              <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
              <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
            </div>
          ) : !selectedFolderId ? (
            <p className="mt-6 text-sm text-slate-500">
              Seleziona una cartella dalla barra laterale per vedere i file disponibili.
            </p>
          ) : filteredFiles.length === 0 ? (
            <p className="mt-6 text-sm text-slate-500">
              Nessun file presente in questa cartella. Torna più tardi!
            </p>
          ) : (
            <ul className="mt-6 space-y-4">
              {filteredFiles.map((file) => {
                const meta = FILE_TYPE_META[detectFileType(file)] ?? FILE_TYPE_META.file
                return (
                  <li
                    key={file.id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-200 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex flex-1 items-start gap-4">
                      <div className="mt-1 text-2xl" aria-hidden="true">
                        {meta.icon}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-slate-900">{file.name || 'File senza nome'}</p>
                        {file.description && <p className="mt-1 text-sm text-slate-500">{file.description}</p>}
                        <div className="mt-2">
                          <FileBadge file={file} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                      <a
                        href={file.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl bg-binavy px-4 py-2 text-sm font-semibold text-white transition hover:bg-binavy/90 focus:outline-none focus:ring-2 focus:ring-binavy focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Apri
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(file.url)}
                        className="inline-flex items-center justify-center rounded-xl border border-binavy px-4 py-2 text-sm font-semibold text-binavy transition hover:bg-binavy/10 focus:outline-none focus:ring-2 focus:ring-binavy focus:ring-offset-2"
                      >
                        Copia link
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
