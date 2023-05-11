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

const gEmail = [
    {
        id: _makeId(),
        subject: 'Order 3382758979: order confirmation',
        body: 'Hello Steve Bendersky, thanks for shopping at our site. order number 3382758979 has been confirmed. we will inform you once the order has been dispatched.',
        isRead: false,
        sentAt: 1551133930594,
        removeAt: null,
        name: 'Ali Express',
        from: 'transaction@notice.aliexpress.com',
        to: 'user@appsus.com',
        isArchive: false,
        isSchedule: false,
    },
    {
        id: _makeId(),
        subject: 'Etai and 56 others made changes in your shared folders',
        body: 'Activity in Shared Folders Here\'s what happened in your shared folders last week',
        isRead: false,
        sentAt: getRandomDate(),
        removeAt: null,
        name: 'Dropbox',
        from: 'no-reply@dropbox.com',
        to: 'user@appsus.com',
        isArchive: false,
        isSchedule: false,
    },
    {
        id: _makeId(),
        subject: 'etailevi invited you to etailevi/Appsus',
        body: 'You can accept or decline this invitation. You can also head over to https://github.com/etailevi/Apsus to check out the repository or visit @etailevi to learn a bit more about them. This invitation will expire in 7 days.',
        isRead: false,
        sentAt: getRandomDate(),
        removeAt: null,
        name: 'Etai Levi',
        from: 'noreply@github.com',
        to: 'user@appsus.com',
        isArchive: false,
        isSchedule: false,
    },
    {
        id: _makeId(),
        subject: 'Your Amazon.com order #112-9421052-6932154',
        body: 'Hello Steve, Thank you for shopping with us.We\'ll send a confirmation when your items ship.',
        isRead: false,
        sentAt: getRandomDate(),
        removeAt: null,
        name: 'Amazon.com',
        from: 'auto-confirm@amazon.com',
        to: 'user@appsus.com',
        isArchive: false,
        isSchedule: false,
    },
    {
        id: _makeId(),
        subject: 'IBKR FYI: Earnings Notification',
        body: 'Dear Client, We would like to inform you that one or more companies in which you hold positions will announce earnings soon with consensus estimates as detailed below.Please see KB2133 to learn more about trading strategies some investors use in connection with earnings announcements.',
        isRead: false,
        sentAt: getRandomDate(),
        removeAt: null,
        name: 'IBKR FYI',
        from: 'donotreply@interactivebrokers.com',
        to: 'user@appsus.com',
        isArchive: false,
        isSchedule: false,
    },
    {
        id: _makeId(),
        subject: 'Best time to book your ski holiday',
        body: 'Experience the thrills of sliding down the snowy slopes, soaking up the mountain air, and starting afresh after a session in the spa. There are so many delightful moments to be had in the mountains not least the après-ski aperitif by the fireplace and convivial fondue with friends and family. Plan your next winter holidays now and take advantage of our early booking rates on a wide selection of resorts. See our premium collection of 4* and 5* hotels, chalets, and residences all ideally located at the foot of the slopes in La Plagne, Tignes, LesArcs, Val d\'Isère, Val Thorens, and l\'Alpe d\'Huez. Enjoy you ski holidays with guaranteed snow throughout winter and unique experiences for all snowsports lovers, as well as a wide variety of exciting or relaxing activities for the whole family.',
        isRead: true,
        sentAt: getRandomDate(),
        removeAt: null,
        name: 'Les Etincelles',
        from: 'welcome@email.etincelles.com',
        to: 'user@appsus.com',
        isArchive: false,
        isSchedule: false,
    },
    {
        id: _makeId(),
        subject: 'Tech compensation insights 💰, LinkedIn\'s datastore overhaul 📈, private ChatGPT vault 🔮',
        body: 'Reduce manual work, get everyone on the same page, and improve time to resolution with a fully-customizable platform that works with all the tools you love.With FireHydrant, you can: Kickoff and manage incidents without leaving Slack Instantly assemble the right people and information, Eliminate guesswork for responders,Streamline internal and external communications, Auto- capture incident data for more efficient retros, Join thousands of reliability - obsessed engineers - get started at firehydrant.com / tldr or watch our 4 minute demo.',
        isRead: true,
        sentAt: getRandomDate(),
        removeAt: null,
        name: 'TLDR Web Dev',
        from: 'dan@tldrnewsletter.com',
        to: 'user@appsus.com',
        isArchive: false,
        isSchedule: false,
    },

]

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
    return { txt: '', status: '', isRead: '', isStared: '', labels: '', isArchive: '', isSchedule: '' }
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

function _makeId(length = 3) {
    var txt = 'e'
    var possible = '0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

console.log(getRandomDate())

// function getRandomDate() {
//     const maxDate = Date.now();
//     return Math.floor(Math.random() * maxDate);
// }


function getRandomDate() {
    const minDate = new Date('2014-01-01').getTime()
    const maxDate = Date.now()

    const randomTimestamp = Math.floor(Math.random() * (maxDate - minDate + 1)) + minDate

    return randomTimestamp
}

function getEmptyMail() {
    return {
        id: '',
        from: '',
        to: '',
        isRead: false,
        removeAt: null,
        isArchive: false,
        isSchedule: false,
        subject: '',
        body: ''
    }
}