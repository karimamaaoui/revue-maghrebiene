import React, { useState } from 'react';
import axios from 'axios';

const Post = () => {
    const [newUser, setNewUser] = useState(
        {
            titre: '',
            bio: '',
            fileArticle: [] ,
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();        
        console.log(" e.target.files[0]",newUser.fileArticle)

        const formData = new FormData();
        formData.append('titre', newUser.titre);
        formData.append('bio', newUser.bio);
        formData.append('fileArticle', newUser.fileArticle);
        console.log("formddsd",newUser)
        const config = {
            headers: {
              Accept: 'application/json',
            },
          };
        

        axios.post('http://localhost:5000/api/post/add',newUser,config, )
             .then(res => {
                console.log(res);
             })
             .catch(err => {
                console.log(err);
             });
    }

    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        setNewUser({...newUser, fileArticle: e.target.files[0]});
        console.log(" e.target.files[0]", e.target.files[0])

    }

    
    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type="file" 
                name="fileArticle"
                onChange={handlePhoto}
            />
            

            <input 
                type="text"
                placeholder="name"
                value={newUser.titre}
                onChange={(event) =>
                    setNewUser({ ...newUser, titre: event.target.value })}
               
            />

            <input 
                type="text"
                value={newUser.bio}
                onChange={(event) =>
                    setNewUser({ ...newUser, bio: event.target.value })}
                        />

            <input 
                type="submit"
            />
        </form>
    );
}

export default Post;
