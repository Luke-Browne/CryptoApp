const functions = require('firebase-functions');
const corsHandler = require('cors')({ origin: false });
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.database().ref('/watchlists');

const getWatchlistsFromDatabase = (res) => {
    let watchlists = [];
    return db.on(
        'value',
        snapshot => {
            snapshot.forEach(item => {
                watchlists.push({
                    dbID: item.key,
                    id: item.val().id,
                    symbol: item.val().symbol,
                    userEmail: item.val().userEmail
                });
            });
            res.status(200).json(watchlists);
        },
        error => {
            res.status(error.code).json({
                message: `Error: ${error.message}`
            });
        }
    );

};

exports.addToWatchlist = functions.https.onRequest((req, res) => {

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', '*');

    return corsHandler(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(401).json({
                message: 'Not allowed'
            });
        }

        const id = req.query.id;
        const symbol = req.query.symbol;
        const userEmail = req.query.userEmail;

        db.push({ id, symbol, userEmail });
        getWatchlistsFromDatabase(res);
    });
});

exports.getWatchlists = functions.https.onRequest((req, res) => {
    return corsHandler(req, res, () => {
        if (req.method !== 'GET') {
            return res.status(404).json({
                message: 'Not allowed'
            })
        }
        getWatchlistsFromDatabase(res);
        console.log(res);
    });
})

exports.deleteFromWatchlist = functions.https.onRequest((req, res) => {
    return corsHandler(req, res, () => {
        if(req.method !== 'DELETE') {
            return res.status(401).json({
                message: 'Not allowed dude...'
              })
        }
        const dbID = req.query.dbID;
        db.child(dbID).remove();
        getWatchlistsFromDatabase(res);
    })
})
