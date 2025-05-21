export function renderPageNumbers(page: number, total_pages: number, navigateToParticularPage: (pageNumber: number) => void) {
  const pages = []

  if (total_pages <= 7) {
    for (let i = 1; i <= total_pages; i++) {
      pages.push(i)
    }
  } else {
    if (page <= 3) {
      pages.push(1, 2, 3, 4, '...', total_pages)
    } else if (page >= total_pages - 2) {
      pages.push(1, '...', total_pages - 3, total_pages - 2, total_pages - 1, total_pages)
    } else {
      pages.push(1, '...', page - 1, page, page + 1, '...', total_pages)
    }
  }

  return (
    <div className="page-info">
      {pages.map((p, i) => {
        if (typeof p === 'string') {
          return (
            <div key={`ellipsis-${i}`} className="seperator">
              ...
            </div>
          )
        }

        return (
          <div
            key={p}
            className={p === page ? 'current-page' : 'page-number'}
            onClick={() => navigateToParticularPage(p)}
          >
            {p}
          </div>
        )
      })}
    </div>
  )
}