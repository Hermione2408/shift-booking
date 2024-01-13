'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/page'
import { Provider} from 'react-redux'
import store from '../../store/store'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
        <div className='container'>
          <Header />
          <div>
          {children}
          </div>
        </div>
        </Provider>
      </body>
    </html>
  )
}
