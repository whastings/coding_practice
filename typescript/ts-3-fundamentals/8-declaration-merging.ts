// Identifiers in TS can be associated with value, type, or namespace
// A value can be assigned to a variable
function funcValue() {}
const value = funcValue
// An interface or type can't
interface AnInterface {}
// const interfaceValue = AnInterface (Error)
// But an interface/type can be used with a variable declaration
let interfaceValue: AnInterface
// A function or variable can't without `typeof`
// const funcVariable: funcValue (Error)
let funcVariable: typeof funcValue
// All can be exported
export { funcValue, AnInterface }

// Classes are both types and values
class Contact {
  constructor(
    public name: string
  ) {}
}
// As a value, refers to the class function
const contactClass = Contact
contactClass.prototype
// As a type, it represents instances of the class
const contactInstance: Contact = new Contact('Will')

// Declarations using the same identifier are merged
class Album {
  label: Album.AlbumLabel = new Album.AlbumLabel()
}
namespace Album {
  export class AlbumLabel {}
}
// Interface props will be added to props from Album class
interface Album {
  artist: string,
}
const myAlbum: Album = new Album()
myAlbum.label
myAlbum.artist // From interface
// This will export the class, namespace, and interface under one identifier
export { Album }

// Namespaces can also be merged with functions
function aFunction () {}
namespace aFunction {
  export const num: number = 5
}
aFunction.num
