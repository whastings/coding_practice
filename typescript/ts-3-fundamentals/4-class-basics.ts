import { HasEmail, HasPhoneNumber } from './1-basics'

// Class can implement an interface
class Contact implements HasEmail {
  // Can specify types of instance variables
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name
    this.email = email
  }
}
const contact = new Contact('Will', 'will@example.com')

// Class can use "param prop" syntax sugar to be more concise in setting variables
class ParamPropContact implements HasEmail {
  // Automatically sets types of instance variables and creates constructor that takes
  // same variables as arguments and assigns them to instance.
  constructor(
    public name: string,
    public email: string,
  ) {}
}

// Class can have property and method access modifiers
class User implements HasEmail, HasPhoneNumber {
  // `readonly` makes reassignment illegal
  public readonly name: string
  public email: string
  public phoneNumber: string
  // `protected` limits access to this class and its subclasses
  protected age: number
  // `private` limits access to just this class
  private password: string

  constructor(name: string, email: string, age: number, password: string) {
    this.name = name
    this.email = email
    this.age = age
    this.password = password
  }
}
const user = new User('Will', 'will@example.com', 30, 'abc123')
// user.name = 'Bob' (Error)
// user.age (Error)
// user.password (Error)

// Class can be abstract
abstract class AbstractContact implements HasEmail, HasPhoneNumber {
  constructor(
    public name: string,
    public email: string,
    public phoneNumber: string
  ) {}

  // Abstract method must be implemented by subclass
  abstract sendEmail(): void
}
class ConcreteContact extends AbstractContact {
  constructor(
    public name: string,
    public email: string,
    public phoneNumber: string
  ) {
    super(name, email, phoneNumber)
  }

  sendEmail() {
    console.log('Sending email')
  }
}
