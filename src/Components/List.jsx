import React, { useState } from 'react'
import { db } from '../firebaseConfig'
import { ref,onValue, remove } from 'firebase/database'
import { useEffect } from 'react'

const List = () => {

    const [list, setList] = useState([])

    useEffect(() => {
        let todoRef = ref(db, "tasks/");
        onValue(todoRef, (snap) => {
            let data = []
            snap.forEach((child) => {
                var value = child.val()
                value['id'] = child.key;
                data = [...data, value]
            })
            setList(data)
        })
    }, [])

    function handleRemove(id){
        console.log(id)
        const removeRef = ref(db ,`tasks/${id}`)
        remove(removeRef);
    }
    return (
        <div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-6 mx-auto">
                        {list.map((li, key) => (
                            <ul className="list-group" key={key}>
                                <li href="" className="list-group-item list-group-item-action">{li.title}
                                <button onClick={()=>handleRemove(li.id)} className="float-end badge bg-danger text-white border-0 py-2">X</button>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List