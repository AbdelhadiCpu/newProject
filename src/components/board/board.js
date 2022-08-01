import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import React, { useEffect, useState } from "react"
import './board.css'
import Chat from "../chat"
import Axios from "axios"
import swal from 'sweetalert'
import zoom from './zoom.png'
//import { io } from "socket.io-client"

//const socket = io('http://localhost:3001/')

/*const mockData = {
    todo: {
        name: "Todo",
        items: [{
            id: 1000,
            text: "Görev 5656"
        }, {
            id: 2000,
            text: "Görev 5959"
        }]
    },
    inprogress: {
        name: "Inprogress",
        items: [{
            id: 100,
            text: "Görev 1099"
        }]
    },
    inreview: {
        name: "InReview",
        items: [{
            id: 10000,
            text: "Görev 2002"
        }]
    },
    intest: {
        name: "InTest",
        items: [{
            id: 100002,
            text: "Görev 5588"
        }]
    },
    done: {
        name: "Done",
        items: [{
            id: 10000232,
            text: "Görev 9889"
        }]
    }
}*/
function BoardList() {
    const StoredToken = localStorage.getItem('token')
    const room = 'http://localhost:3001/board/' + StoredToken.substring(20, 30)


    var [mockData, setData] = useState({
        todo: {
            name: "Todo",
            items: [{
                id: 1000,
                text: "Make a UX/UI design"
            }, {
                id: 2000,
                text: "Project Conception"
            }]
        },
        inprogress: {
            name: "Inprogress",
            items: [{
                id: 100,
                text: "Project Dev"
            }]
        },
        inreview: {
            name: "InReview",
            items: [{
                id: 10000,
                text: "MVC"
            }]
        },
        intest: {
            name: "InTest",
            items: [{
                id: 100002,
                text: "Integrated Test"
            }]
        },
        done: {
            name: "Done",
            items: [{
                id: 10000232,
                text: "BrainStorming"
            }]
        }
    })





    const [cols, setCols] = useState(mockData)
    const onDragEnd = (result, cols, setCols) => {
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceCol = cols[source.droppableId]
            const destCol = cols[destination.droppableId]
            const sourceItems = [...sourceCol.items]
            const destItems = [...destCol.items]
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            setCols({
                ...cols,
                [source.droppableId]: {
                    ...sourceCol,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destCol,
                    items: destItems
                }
            })


        } else {
            const columns = cols[source.droppableId]
            const _items = [...columns.items]
            const [removed] = _items.splice(source.index, 1)
            _items.splice(destination.index, 0, removed)
            setCols({
                ...cols,
                [source.droppableId]: {
                    ...columns,
                    items: _items
                }
            })
        }
    }
    const [todos, setTodos] = useState('')
    const [account, setAccount] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleChange1 = (e) => {
        setTodos(e.target.value)
    }

    const handleChange2 = (e) => {
        setAccount(e.target.value)
    }



    const ListTodo = () => {
        Object.entries(cols).filter((to) => {
            console.log(todos, to[1])

            if (to[1].name == 'Todo') {
                to[1].items.push({ id: todos.length + 1 + (Math.floor(Math.random() * 100)) * (Math.floor(Math.random() * 1000)), text: todos })
                console.log(to[1])
            }


        })
        Update()
    }

    const SendInvitation = () => {
        Axios.post(room, {
            account: account
        }).then((response) => {
            console.log(response.data.message)
            if (response.data.message == 'Email Not Valid') {
                swal('Oops!', response.data.message, 'error')

            } else {
                swal('Congrats!', response.data.message, 'success')
            }

        })
    }




    /*const onChange = (e)=>{
        socket.emit('typing',{username:username})
    }

    useEffect(()=>{
        socket.on('someOneTyping',(user)=>{
            setTyping(user.username+'is Typing....')
        })
    },[])*/

    const Update = async () => {
        localStorage.setItem('TransferedData', JSON.stringify(cols))
        let Updated = localStorage.getItem('TransferedData')
        let mockDataUpdated = JSON.parse(Updated)
        setCols(mockDataUpdated)


        //Object.assign(mockData,mockDataUpdated)

        console.log(mockData)
    }



    return (
        <div>
            <div className="Options" style={{ display: 'flex' }}>
                <div className="contextTo" style={{ marginLeft: '10rem', marginTop: '1rem', display: 'flex' }}>
                    <input
                        style={{ backgroundColor: '#DFCFBE' }}
                        type="text"
                        className="todos"
                        placeholder="To Do"
                        name="todos"
                        maxLength='30'
                        value={todos}
                        onChange={handleChange1}
                    />
                    <button onClick={ListTodo} onSubmit={handleSubmit} type='submit' className='addToDo' style={{ backgroundColor: '#55c2da', maxHeight: '1.90rem' }}>Go</button>



                </div>

                <div className="contextToInvite" style={{ marginLeft: '10rem', marginTop: '1rem', display: 'flex' }}>
                    <input
                        style={{ backgroundColor: '#DFCFBE' }}
                        type="text"
                        className="toInvite"
                        placeholder="Invite friends by Gmail"
                        name="account"
                        value={account}
                        onChange={handleChange2}
                    />
                    <button onClick={SendInvitation} onSubmit={handleSubmit} type='submit' className='addFriend' style={{ backgroundColor: '#55c2da', maxHeight: '1.90rem' }}>Invite</button>



                </div>

                <a href='https://zoom.us/'><img className="zoomImg" alt='zoom-img' src={zoom} /></a>

            </div>

            <div className="app-container">


                <DragDropContext onDragEnd={(result) => {
                    onDragEnd(result, cols, setCols)


                }}>

                    {Object.entries(cols).map(([id, col], index) => {
                        return (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={index}>
                                <h5 style={{ backgroundColor: '#FFFF00' }}>{col.name}</h5>
                                <div style={{ marginLeft: "8px" }}>
                                    <Droppable droppableId={id} key={id}>
                                        {(provider, snapshot) => {
                                            return (
                                                <div   {...provider.droppableProps}
                                                    style={{
                                                        border: "none",
                                                        boxShadow: '0 0 4px purple',
                                                        borderRadius: '5px',
                                                        backgroundColor: snapshot.isDraggingOver ? "#e7e7e7" : "#fff",
                                                        padding: "8px", height: "800px", width: "300px",


                                                    }}
                                                    ref={provider.innerRef}>
                                                    {col.items.map((item, index) => {
                                                        return (
                                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                                {(provider, snapshot) => {
                                                                    return (
                                                                        <div ref={provider.innerRef}
                                                                            {...provider.dragHandleProps}
                                                                            {...provider.draggableProps}
                                                                            style={{
                                                                                padding: "16px",
                                                                                margin: "0 0 16px 0",
                                                                                height: "40px",
                                                                                borderRadius: "8px",
                                                                                backgroundColor: snapshot.isDragging ? "#cccccc" : "#e7e7e7",
                                                                                ...provider.draggableProps.style
                                                                            }}
                                                                        >


                                                                            {item.text}


                                                                            <img className="delete"
                                                                                onClick={(event) => {

                                                                                    console.log(event.currentTarget.id)
                                                                                    Object.entries(cols).filter((arr) => {
                                                                                        console.log(arr[1])
                                                                                        if (arr[1]) {
                                                                                            for (let i = 0; i < arr[1].items.length; i++) {
                                                                                                if (arr[1].items[i].id == event.currentTarget.id) {
                                                                                                    //console.log(arr[1].items[i])
                                                                                                    var poped = arr[1].items.splice(i, 1)
                                                                                                    console.log('deleted' + poped[0].text)
                                                                                                    //console.log(arr)
                                                                                                }

                                                                                            }



                                                                                        }

                                                                                    })
                                                                                    Update()

                                                                                }}
                                                                                id={item.id}
                                                                                src='https://toppng.com/uploads/preview/recycling-bin-vector-delete-icon-png-black-11563002079w1isxqyyiv.png'
                                                                                style={{ height: "1.25rem", width: "1.25rem", marginLeft: '0.7rem' }}

                                                                            />

                                                                        </div>
                                                                    )
                                                                }}

                                                            </Draggable>
                                                        )
                                                    })}
                                                    {provider.placeholder}

                                                </div>
                                            )
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        )
                    })}
                </DragDropContext>
                <Chat />
            </div>
            



        </div>
    );
}

export default BoardList




