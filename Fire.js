// import firebase from 'firebase'
// import '@firebase/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyArwfr76EtaZ8x8bq8PIxw2McJco8GgI3s",
//     authDomain: "dhtotoapp.firebaseapp.com",
//     projectId: "dhtotoapp",
//     storageBucket: "dhtotoapp.appspot.com",
//     messagingSenderId: "284931889827",
//     appId: "1:284931889827:web:64b736fa5bd6d51538fd16"
// }

// class Fire {
//     constructor(callback) {
//         this.init(callback);
//     }

//     init() {
//         if (!firebase.apps.length) {
//             firebase.initializeApp(firebaseConfig)
//         }

//         firebase.auth().onAuthStateChanged(user => {
//             if (user) {
//             } else {
//                 firebase
//                     .auth()
//                     .signInAnonymously()
//                     .catch(error => {
//                         callback(error);
//                      });       
//             }
//         });
//     }
//     getLists(callback) {
//         let ref = firebase
//             .firestore()
//             .collection("users")
//             .doc(this.userID)
//             .collection("lists");

//         this.unsubscribe = ref.onSnapshot(snapshot => {
//             lists = []

//            snapshot.forEach(doc => {
//                 lists.push({id: doc.id, ...doc.data()})
//            }) 

//            callback(lists)
//         })
//     }

//     get userID() {
//         return firebase.auth().currentUser.uid;
//     }

//     detach(){
//         this.unsubscribe();
//     }

// }

// export default Fire;