const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const { stringify } = require("querystring");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function readContacts() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const filterContactsById = contacts.filter(({ id }) => id === contactId);
  return filterContactsById;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const updateContacts = contacts.filter(({ id }) => id !== contactId);
  if (contacts.length === updateContacts.length) {
    console.error(`Unknown id ${contactId}`);
  } else {
    await writeContacts(updateContacts);
  }
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  const contacts = await readContacts();
  contacts.push(newContact);
  await writeContacts(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  contactsPath,
};
