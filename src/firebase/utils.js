import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const firebaseGetUserById = async id => {
  try {
    let data = {};
    await firestore()
      .collection('users')
      .where('id', '==', id)
      .get()
      .then(docs => {
        if (docs && docs?.docs && docs.docs.length > 0) {
          docs.forEach(doc => {
            data = doc.data();
          });
        } else {
          throw new Error('Error getting documents');
        }
      })
      .catch(err => {
        throw new Error('Error getting firebaseGetUserById' + err);
      });

    return data;
  } catch (err) {
    console.log({err});
  }
};

const getAllOrders = async () => {
  try {
    const snapshot = await firestore().collection('order').get();
    return snapshot.docs.map(doc => doc.data());
  } catch (err) {
    console.log({err});
  }
};

const firebaseSignIn = async obj => {
  try {
    const res = await auth()
      .signInWithEmailAndPassword(obj.email, obj.password)
      .then(async result => {
        const user = result.user;
        const userData = await firebaseGetUserById(user.uid);
        return userData;
      })
      .catch(error => {
        throw new Error(error);
      });
    return res;
  } catch (err) {
    throw new Error({'Error due to in sifgn in': err});
  }
};

const updateOrder = async (obj, type) => {
  try {
    const ref = firestore().collection('order');

    const querySnapshot = await ref.where('id', '==', obj.id).get();

    if (querySnapshot.size > 0) {
      const documentSnapshot = querySnapshot.docs[0];
      const documentRef = ref.doc(documentSnapshot.id);
      // Update the fields you want to modify
      if (type === 'vender') {
        await documentRef.update({
          vender_coordinates: obj.coordinate,
        });
      } else if (type === 'client') {
        await documentRef.update({
          client_coordinates: obj.coordinate,
        });
      }

      console.log('Document updated successfully');
    } else {
      console.log('Document not found');
    }
  } catch (error) {
    console.error('Error updating document:', error);
  }
};

export {getAllOrders, firebaseSignIn, firebaseGetUserById, updateOrder};
