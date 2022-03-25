import React, { useEffect, useState } from 'react'
import {db , storage} from '../firebaseConfig'
import {getDownloadURL, ref as fileRef, uploadBytesResumable } from 'firebase/storage'
import {ref,set,push} from 'firebase/database'
import { useNavigate } from 'react-router-dom'
const Create = () => {
    
    const[data,setData] = useState('')
    const [prog , setProg] = useState(0)

    const handleForm = () => {
        let todoRef = push(ref(db,"tasks"))

        set(todoRef,{
            title:data,
            status:true
        })
        setData("")
    }
    const nav = useNavigate()

    function handleFileSubmit(e){
        e.preventDefault();
        if(!e.target[0].files[0]) return 

        const file = e.target[0].files[0];

        const storageRef = fileRef(storage ,`images/${file.name}`);

        const uploadFile = uploadBytesResumable(storageRef,file);

        uploadFile.on('state_changed' , snap => {
            console.log(snap)
            const prog = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
            setProg(prog);
        },err=>console.log(err),
        ()=>{
            console.log('succ')
            getDownloadURL(uploadFile.snapshot.ref).then((url) => console.log(url)).catch(err=>console.log(err))
        }
        )



    }

    
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-6 mx-auto">
                        <div className="card">
                            <div className="card-body d-flex">
                                <input type="text" name="" value={data} placeholder='Enter Task' onChange={(e) => setData(e.target.value)}  className="form-control" />
                                <input type="submit" onClick={() => handleForm()} name="" id="" className="btn btn-primary" />
                            </div>
                        </div>
                        <div className="card">
                            <form onSubmit={handleFileSubmit} className="">
                                <input type="file" className="form-control" />
                                <input type="submit"  className="btn btn-primary" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create