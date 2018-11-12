import {serverAdmin, serverLibrarian, serverReader} from './config'

//admin
export const fetchAdminLogin = async (account, password) => {
    try {
        const Response = await fetch(`${serverAdmin}/admin/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: account,
                password: password,
            })
        })
        const result = await Response.json()
        return result.state
    }
    catch {
        return null
    }
}

export const fetchAdminShowRules = async () => {
    try {
        const Response = await fetch(`${serverAdmin}/showRules`)
        const result = await Response.json()
        return result
    }
    catch {
        return []
    }
}

export const fetchChangeRules = async (id, value) => {
    try {
        const Response = await fetch(`${serverAdmin}/admin/changeRules?rule=${id}&value=${value}`)
        const result = await Response.json()
        return result.state
    }
    catch {
        return []
    }
}

export const fetchAdminChangePassword = async password => {
    try {
        const Response = await fetch(`${serverAdmin}/admin/changePassword`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: password
            })
        })
        const result = await Response.json()
        return result.state
    }
    catch {
        return null
    }
}
export const fetchShowLibrarians = async () => {
    try {
        const Response = await fetch(`${serverAdmin}/admin/showLibrarian`)
        const result = await Response.json()
        return result.librarians
    }
    catch {
        return []
    }
}
export const fetchDeleteLibrarian = async id => {
    try {
        const Response = await fetch(`${serverAdmin}/admin/deleteLibrarian`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            })
        })
        const result = await Response.json()
        return result.state
    }
    catch {
        return null
    }
}
export const fetchAddLibrarian = async (id, email, password) => {
    try {
        const Response = await fetch(`${serverAdmin}/admin/addLibrarian`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                email: email,
                password: password
            })
        })
        const result = await Response.json()
        return result.state
    }
    catch {
        return null
    }
}
export const fetchUpdateLibrarian = async (id, email, password) => {
    try {
        const Response = await fetch(`${serverAdmin}/admin/updateLibrarian`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                email: email,
                password: password
            })
        })
        const result = await Response.json()
        return result
    }
    catch {
        return null
    }
}

//librarian
export const fetchBookList = async () => {
  try {
    const Response = await fetch(`${serverLibrarian}/booklist`)
    const result = await Response.json()
    return result
  } catch {
    return []
  }
}
//
export const fetchReaderList = async () => {
  try {
    const Response = await fetch(`${serverLibrarian}/readerList`)
    const result = await Response.json()
    return result
  } catch {
    return []
  }
}
//
export const fetchDetails = async isbn => {
  try {
    const Response = await fetch(`${serverLibrarian}/details?isbn=${isbn}`)
    const result = await Response.json()
    return result
  } catch {
    return null
  }
}
//
export const fetchAddBookNumber = async info => {
    try {
        const Response = await fetch(`${serverLibrarian}/increaseBookNumber?isbn=${info.isbn}&number=${info.number}&location=${info.location}`)
        const result = await Response.json()
        return result
    }
    catch {
        return null
    }
}

export const fetchAddBook = async newBook => {
  try {
    const Response = await fetch(`${serverLibrarian}/librarian/addBook`, {
      method: 'POST',
      body: newBook
    })
    const result = await Response.json()
    return result
  } catch {
    return null
  }
}
//
export const fetchUpdateBook = async updateBook => {
  try {
    const Response = await fetch(`${serverLibrarian}/librarian/updateBook`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateBook)
    })
    const result = await Response.json()
    return result
  } catch {
    return null
  }
}
//
export const fetchDeleteBook = async (id, barcode) => {
  try {
    const Response = await fetch(`${serverLibrarian}/deleteBook?id=${id}&barcode=${barcode}`)
    const result = await Response.json()
    return result
  } catch {
    return null
  }
}
//
export const fetchBookHistory = async () => {
  try {
    const Response = await fetch(`${serverLibrarian}/bookHistory`)
    const result = await Response.json()
    return result
  } catch {
    return []
  }
}
//
export const fetchBorrow = async info => {
  try {
    const Response = await fetch(`${serverLibrarian}/librarian/borrow`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    const result = await Response.json()
    return result
  } catch {
    return null
  }
}
//
export const fetchReaderHistory = async id => {
  try {
    const Response = await fetch(`${serverLibrarian}/readerHistory?id=${id}`)
    const result = await Response.json()
    return result
  } catch {
    return []
  }
}
//
export const fetchUpdateReader = async info => {
  try{
      const Response = await fetch(`${serverLibrarian}/updateReader`, {
          method: 'POST',
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(info)
      })
      const result = await Response.json()
      return result
  } catch {
    return null
  }
}
//
export const fetchDeleteReader = async id => {
  try {
      const Response = await fetch(`${serverLibrarian}/deleteReader?id=${id}`)
      const result = await Response.json()
      return result
  }
  catch {
      return null
  }
}
//
export const fetchAddReader = async info => {
  try {
    const Response = await fetch(`${serverLibrarian}/addReader`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    const result = await Response.json()
    return result
  } catch {
    return null
  }
}

export const fetchNotification = async () => {
  try {
    const Response = await fetch(`${serverLibrarian}/showAnnouncement`);
    const result = await Response.json();
    return result
  } catch {
    return []
  }
};

export const fetchAddNotification = async (message) => {
    try {
        const Response = await fetch(`${serverLibrarian}/librarian/addAnnouncement?message=${message}`);
        const result = await Response.json();
        return result
    } catch {
        return null
    }
};

export const fetchDeleteNotification = async (timestamp) => {
    try {
        const Response = await fetch(`${serverLibrarian}/librarian/deleteAnnouncement?timestamp=${timestamp}`);
        const result = await Response.json();
        return result
    } catch {
        return null
    }
};

export const fetchUpdateNotification = async (timestamp, message) => {
    try {
        const Response = await fetch(`${serverLibrarian}/librarian/updateAnnouncement?timestamp=${timestamp}&message=${message}`);
        const result = await Response.json();
        return result
    } catch {
        return null
    }
};

export const fetchDownload = url => {
  fetch(url)
  .then(res => res.blob()
  .then(blob => {
    let a = document.createElement('a');
    let url = window.URL.createObjectURL(blob);
    let filename = 'barcode.png';
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }))
}

export const fetchShowCategories = async () => {
    try {
        const Response = await fetch(`${serverLibrarian}/showCategories`)
        const result = await Response.json();
        return result
    }
    catch {
        return []
    }
}

export const fetchAddCategories = async (en, zh) => {
    try {
        const Response = await fetch(`${serverLibrarian}/addCategory?en=${en}&zh=${zh}`)
        const result = await Response.json();
        return result
    }
    catch {
        return null
    }
}

export const fetchUpdateCategories = async (en, en_changed, zh_changed) => {
    try {
        const Response = await fetch(`${serverLibrarian}/changeCategory?en=${en}&en_changed=${en_changed}&zh_changed=${zh_changed}`)
        const result = await Response.json();
        return result
    }
    catch {
        return null
    }
}

export const fetchDeleteCategories = async (en) => {
    try {
        const Response = await fetch(`${serverLibrarian}/deleteCategory?en=${en}`)
        const result = await Response.json();
        return result
    }
    catch {
        return null
    }
}

export const fetchShowLocations = async () => {
    try {
        const Response = await fetch(`${serverLibrarian}/showLocations`)
        const result = await Response.json();
        return result
    }
    catch {
        return []
    }
}

export const fetchAddLocations = async (location) => {
    try {
        const Response = await fetch(`${serverLibrarian}/addLocation?location=${location}`)
        const result = await Response.json();
        return result
    }
    catch {
        return null
    }
}

export const fetchUpdateLocations = async (location, location_changed) => {
    try {
        const Response = await fetch(`${serverLibrarian}/changeLocation?old=${location}&change=${location_changed}`)
        const result = await Response.json();
        return result
    }
    catch {
        return null
    }
}

export const fetchDeleteLocations = async (location) => {
    try {
        const Response = await fetch(`${serverLibrarian}/deleteLocation?location=${location}`)
        const result = await Response.json();
        return result
    }
    catch {
        return null
    }
}

export const fetchUpdateBookLocation = async (barcode, location) => {
    try {
        const Response = await fetch(`${serverLibrarian}/updateBookLocation?barcode=${barcode}&location=${location}`)
        const result = await Response.json();
        return result
    }
    catch {
        return null
    }
}


export const fetchLibraryInfo = async (which) => {
    try {
        const Response = await fetch(`${serverLibrarian}/librarian/showLibraryInfo?which=${which}`)
        const result = await Response.json();
        return result
    }
    catch {
        return []
    }
}

export const fetchSearchIsbn = async which => {
  try {
      const Response = await fetch(`${serverLibrarian}/searchIsbn?isbn=${which}`)
      const result = await Response.json();
      return result
  }
  catch {
      return {}
  }
}

export const fetchPayFine = async (info) => {
    try {
        const Response = await fetch(`${serverLibrarian}/fine?barcode=${info.barcode}&state=${info.state}`)
        const result = await Response.json();
        return result
    }
    catch {
        return null
    }
}

// reader
export const fetchReaderLibrarianLogin = async (account, password) => {
    try {
        const Response = await fetch(`${serverReader}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: account,
                password: password,
            })
        })
        const result = await Response.json()
        return result.state
    } catch {
        return null
    }
}

export const fetchFindPassword = async (ID, email) => {
    try {
        const Response = await fetch(`${serverLibrarian}/findPassword?id=${ID}&email=${email}`)
        const result = await Response.json()
        return result
    } catch {
        return null
    }
}

export const fetchSearchBookByCategory = async (term) => {
    try {
        const Response = await fetch(`${serverReader}/searchCategory?category=${term}`)
        const result = await Response.json()
        return result
    }
    catch {
        return []
    }
}

export const fetchSearchBookByKeywords = async (term) => {
    try {
        const Response = await fetch(`${serverReader}/searchBooks?keywords=${term}`)
        const result = await Response.json()
        return result
    }
    catch {
        return []
    }
}

export const fetchShowNotification = async () => {
    try {
        const Response = await fetch(`${serverReader}/showAnnouncement`)
        const result = await Response.json()
        return result.announcements
    }
    catch {
        return []
    }
}

export const fetchShowRules = async () => {
    try {
        const Response = await fetch(`${serverReader}/showRules`)
        const result = await Response.json()
        return result
    }
    catch {
        return []
    }
}

export const fetchSearchReader = async (id) => {
    try {
        const Response = await fetch(`${serverReader}/searchReader?id=${id}`)
        const result = await Response.json()
        return result
    }
    catch {
        return null
    }
}

export const fetchBookDetails = async (isbn) => {
    try {
        const Response = await fetch(`${serverReader}/bookDetails?isbn=${isbn}`)
        const result = await Response.json()
        return result.bookList
    }
    catch {
        return []
    }
}

export const fetchReserveBook = async (id, barcode) => {
    try {
        const Response = await fetch(`${serverReader}/reader/reserveBook`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                barcode: barcode,
            })
        })
        const result = await Response.json()
        return result.state
    }
    catch {
        return null
    }
}

export const fetchCancelReserve = async (id, barcode, reserveTime) => {
    try {
        const Response = await fetch(`${serverReader}/reader/cancelReserve`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                barcode: barcode,
                timestamp: reserveTime
            })
        })
        const result = await Response.json()
        return result.state
    }
    catch {
        return null
    }
}

export const fetchReaderUpdateInfo = async (id, name, email, password) => {
    try {
        const Response = await fetch(`${serverReader}/updateReader`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                name: name,
                email: email,
                password: password,
            })
        })
        const result = await Response.json()
        return result.state
    }
    catch {
        return null
    }
}