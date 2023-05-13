import { eventBusService } from "../services/event-bus.service.js"
const { useState, useEffect, useRef } = React

export function UserMsg() {

  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      ('Got msg', msg)
      setMsg(msg)
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 20000)
    })
    return unsubscribe
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type}`}>
      <ul className="clean-list flex row space-between align-center">
        <li>
          {msg.txt}
        </li>
        <li>
          <button onClick={closeMsg}><i className="fa-solid fa-x"></i></button>
        </li>
      </ul>
    </section>
  )
}

