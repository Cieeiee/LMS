# Library Management System

This project was bootstrapped with [React](https://reactjs.org) and [material-ui](https://material-ui.com).

We divided the project into 3 parts by different user groups.

[Librarian system](#Librarian system)

[Admin system](#Admin system)

[Reader system](#Reader system)

### Librarian system

Librarian can

- Book Management
  - Add Book-Auto Generate Book ID after book successfully ADD
  - Delete Book-Book Damage/Book Lost
  - Edit Book-Edit book information or location change details
- Search Book
- Register Reader information only after 300 yuan security deposit
- Reader history
- Lend Book + Return
- View Library Income History (Daily/Weekly/Monthly)
- Post News
- Edit Book Category
- Edit Book Location

### Admin system

Admin can

- Login root account
- Register Librarian account
- Search and Manage Librarian Account
- Set book fine value
- Set book return period
- Set Reader security deposit
- Help to recovery Librarian password

### Reader system

Reader can

- Search-with any keywords of the Book
- view
  - Borrow history-Books currently taken by him/her
  - Return history-Books already return (show fine if delayed)
  - View total fine amount to pay
  - Alerts to email
- Reserve-Should borrow within 2 hours within reserve else reserve status is cancelled.
- Recovery forget password using email in personal information
- Change reader’s personal information and password
