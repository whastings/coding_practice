interface Subscription {
  unsubscribe: () => void,
}

class EventEmitter {
  private eventsMap = new Map<string, Array<Function | null>>()

  emit(eventName: string, ...args: any[]) {
    const callbacks = this.eventsMap.get(eventName) || []
    callbacks.forEach((callback) => callback && callback(...args))
  }

  subscribe(eventName: string, callback: Function): Subscription {
    const callbacks = this.eventsMap.get(eventName) || []
    callbacks.push(callback)
    this.eventsMap.set(eventName, callbacks)

    const callbackIndex = callbacks.length - 1

    return {
      unsubscribe() {
        callbacks[callbackIndex] = null
      }
    }
  }
}

export default EventEmitter
