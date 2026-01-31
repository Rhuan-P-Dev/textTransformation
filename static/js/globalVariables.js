const loc    = window.document.location
const socket = io.connect(loc.origin)

var runChain = true

/* -------------------------------------------------------------- */
class Observer {
  /** ------------------------------------------------------------
   *  All supported subscriber flags – static so it belongs to the class
   *  ------------------------------------------------------------ */
  static SubscriberConfig = {
    SELF_DELETE: 'selfDelete',
    // ← add more flags here when you need them (e.g. ONCE: 'once')
  }

  constructor() {
    /** Map<callbackFn, configObj>  */
    this.subscribers = new Map()
  }

  /** ------------------------------------------------------------
   *  Private helper – keep only the flags defined in SubscriberConfig
   *  ------------------------------------------------------------ */
  #cleanConfig(config = {}) {
    const allowed = Object.values(Observer.SubscriberConfig) // ['selfDelete']
    return allowed.reduce((obj, flag) => {
      if (Object.prototype.hasOwnProperty.call(config, flag)) {
        obj[flag] = !!config[flag]               // normalise to boolean
      }
      return obj
    }, {})
  }

  /** ------------------------------------------------------------
   *  Subscribe a listener with an optional config object
   *  ------------------------------------------------------------ */
  subscribe(fn, config = {
    selfDelete: true
  }) {
    const clean = this.#cleanConfig(config)   // keep only valid flags
    this.subscribers.set(fn, clean)
  }

  /** ------------------------------------------------------------
   *  Remove a listener
   *  ------------------------------------------------------------ */
  unsubscribe(fn) {
    this.subscribers.delete(fn)
  }

  /** ------------------------------------------------------------
   *  Notify every listener and honour its config (e.g. selfDelete)
   *  ------------------------------------------------------------ */
  notify(data) {
    // Clone entries because we may delete while iterating
    const entries = Array.from(this.subscribers.entries())
    entries.forEach(([fn, cfg]) => {
      fn(data)

      // 1️⃣ selfDelete – remove after a single run
      if (cfg[Observer.SubscriberConfig.SELF_DELETE]) {
        this.unsubscribe(fn)
      }
    })
  }

  /** ------------------------------------------------------------
   *  Introspection helpers (optional)
   *  ------------------------------------------------------------ */
  getConfig(fn) {
    return this.subscribers.get(fn)
  }

  /** Return **all** config‑keys that are currently used by any subscriber */
  getAllUsedConfigKeys() {
    const keys = new Set()
    this.subscribers.forEach(cfg => {
      Object.keys(cfg).forEach(k => keys.add(k))
    })
    return Array.from(keys)
  }

  /** Return the list of *possible* config keys (the source of truth) */
  static getPossibleConfigKeys() {
    return Object.values(this.SubscriberConfig)
  }
}