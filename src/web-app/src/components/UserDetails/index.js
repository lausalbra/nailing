export function UserDetails({ image, username, email, phone }) {
    return (
        <div className="flex items-center">
            <img src={image} alt="img" className="max-w-full float-left" />
            <div className="ml-5 items-center">
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Teléfono:</strong> {phone}</p>
            </div>
        </div>)
}