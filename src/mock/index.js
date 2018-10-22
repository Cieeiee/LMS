const baseUrl = 'http://192.168.1.200:8080'
//
export const fetchBookList = async () => {
  try {
    const Response = await fetch(`${baseUrl}/booklist`)
    const result = await Response.json()
    return result
  } catch {
    return null
  }
}
//
export const fetchReaderList = async () => {
  try {
    const Response = await fetch(`${baseUrl}/readerList`)
    const result = await Response.json()
    return result
  } catch {
    return null
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
    const Response = await fetch(`${baseUrl}/addBook`, {
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
/////////////////////////////////////////////////////////
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
    return null
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