import {serverAdmin, serverLibrarian, serverReader} from './config'
//
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
        const Response = await fetch(`${serverLibrarian}/increaseBookNumber?isbn=${info.isbn}&number=${info.number}`)
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

// reader
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