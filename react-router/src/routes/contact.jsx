import { useState } from "react";
import {Form} from "react-router-dom";

export default function Contact() {
    const contact = {
        first: "Your",
        last: "Name",
        avatar: "https://placekitten.com/g/200/200",
        twitter: "your handle",
        notes: "some notes",
        favorite: true,
    };

    return (
        <div id="contact">
            <div>
                <img 
                    src={contact.avatar || null}
                    key={contact.avatar} 
                />
            </div>

            <div>
                <h1>
                    {
                        contact.first || contact.last ? (
                            <>{contact.first} {contact.last}</>
                        ) :
                        (
                            <i>No name</i>
                        )
                    } {" "}
                    <Favorite contact={contact} />
                </h1>

                {
                    contact.twitter && (
                        <p>
                            <a
                                href={`https://twitter.com/${contact.twitter}`}
                                target="_blank"
                            >
                                {contact.twitter}
                            </a>
                        </p>
                    )
                }

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(e) => {
                            if (
                                !confirm ("Please confirm you want to delete this record.")
                            ) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>

                </div>
            </div>
        </div>
    );
}

function Favorite({contact}) {
    let favorite = contact.favorite;
    // const [fav, setFav] = useState(favorite)
    // function handleToggle() {
    //     setFav(e => !e);
    // }

    return (
        <Form>
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label= {favorite ? 'Remove from favorite' : "Add to favorite"}
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
}