const baseUrl = 'http://120.78.240.24:7922'
//
export const fetchBookList = async () => {
  try {
    const Response = await fetch(`${baseUrl}/booklist`)
    const result = await Response.json()
    return result
  } catch {
    return []
  }
}
//
export const fetchReaderList = async () => {
  try {
    const Response = await fetch(`${baseUrl}/readerList`)
    const result = await Response.json()
    return result
  } catch {
    return []
  }
}
//
export const fetchDetails = async isbn => {
  try {
    const Response = await fetch(`${baseUrl}/details?isbn=${isbn}`)
    const result = await Response.json()
    return result
  } catch {
    return null
  }
}
//
export const fetchAddBook = async newBook => {
  try {
    const Response = await fetch(`${baseUrl}/librarian/addBook`, {
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
export const fetchUpdateBook = async newBook => {
  try {
    const Response = await fetch(`${baseUrl}/updateBook`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newBook)
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
    const Response = await fetch(`${baseUrl}/deleteBook?id=${id}&barcode=${barcode}`)
    const result = await Response.json()
    return result
  } catch {
    return null
  }
}
//
export const fetchBookHistory = async () => {
  try {
    const Response = await fetch(`${baseUrl}/bookHistory`)
    const result = await Response.json()
    return result
  } catch {
    return []
  }
}
//
export const fetchBorrow = async info => {
  try {
    const Response = await fetch(`${baseUrl}/librarian/borrow`, {
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
    const Response = await fetch(`${baseUrl}/readerHistory?id=${id}`)
    const result = await Response.json()
    return result
  } catch {
    return []
  }
}
//
export const fetchDeleteReader = async id => {
  try {
      const Response = await fetch(`${baseUrl}/deleteReader?id=${id}`)
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
    const Response = await fetch(`${baseUrl}/addReader`, {
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
    const Response = await fetch(`${baseUrl}/showAnnouncement`);
    const result = await Response.json();
    return result
  } catch {
    return []
  }
};

export const fetchAddNotification = async (message) => {
    try {
        const Response = await fetch(`${baseUrl}/librarian/addAnnouncement?message=${message}`);
        const result = await Response.json();
        return result
    } catch {
        return null
    }
};

export const fetchDeleteNotification = async (timestamp) => {
    try {
        const Response = await fetch(`${baseUrl}/librarian/deleteAnnouncement?timestamp=${timestamp}`);
        const result = await Response.json();
        return result
    } catch {
        return null
    }
};

export const fetchUpdateNotification = async (timestamp, message) => {
    try {
        const Response = await fetch(`${baseUrl}/librarian/updateAnnouncement?timestamp=${timestamp}&message=${message}`);
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