// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const MAIL_KEY = 'mailDB'

export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyMail,
    getNextMailId,
    getPreviousMailId,
}

const gEmail = {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removeAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createMails()

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.txt))
            }
            if (filterBy.status) {
                mails = mails.filter(mail => mail.status === filterBy.status)
            }
            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }
            if (filterBy.isStared) {
                mails = mails.filter(mail => mail.isStared === filterBy.isStared)
            }
            if (filterBy.labels) {
                mails = mails.filter(mail => mail.labels && mail.labels.some(label => filterBy.labels.includes(label)))
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getDefaultFilter() {
    // return { title: '', maxPrice: '' }
}

function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then((mails) => {
            let mailIdx = mails.findIndex(mail => mail.id === mailId)
            if (mailIdx === mails.length - 1) mailIdx = -1
            return mails[mailIdx + 1].id
        })
}

function getPreviousMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then((mails) => {
            let mailIdx = mails.findIndex(mail => mail.id === mailId)
            if (mailIdx === 0) mailIdx = mails.length - 1
            return mails[mailIdx - 1].id
        })
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = gEmail
    }
    utilService.saveToStorage(MAIL_KEY, mails)
}