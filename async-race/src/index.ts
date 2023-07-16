import App from './components/app/app'
import './styles.css'

async function startApp (): Promise<void> {
  const app = new App()
  await app.start()
}

startApp().catch(error => {
  console.error('An error occurred during starting the app:', error)
})
