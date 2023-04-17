import React, { useEffect, useState } from "react";
import AddArticle from "../../Components/Client/AddArticles";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function CreateAlbums() {
  const [{ email }] = useAuthState(auth);
  const [document, setDocument] = useState(null);
  const fetchDocument = async (email) => {
    try {
      const docRef = doc(db, "albums-count", `${email}`);
      const documentSnapshot = await getDoc(docRef);

      if (documentSnapshot.exists) {
        setDocument(documentSnapshot.data());
        console.log(documentSnapshot.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };
  useEffect(() => {
    fetchDocument(email);
  }, [email]);

  return (
    <div>
      {/* <>{document.count}</> */}
      {document && document.count > document.total_albums ? (
        <AddArticle alCount={document.count} />
      ) : (
        <>Don't have any albums</>
      )}
    </div>
  );
}

export default CreateAlbums;
