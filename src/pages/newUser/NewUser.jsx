import "./newUser.css";
import Menu from "../../components/menu/menu";

const itemsTest = [
  { name: "All Users", link: "/users" },
  { name: "+ Add User", link: "/user/NewUser" },
  { name: "Find User", link: "/users" },
];

export default function NewUser() {
  return (
    <>
      <Menu menuItems={itemsTest} />
      <div className="newUser">
        <h1 className="newUserTitle">Añadir Cliente</h1>
        <form className="newUserForm">
          <div className="newUserItem">
            <label>Username</label>
            <input type="text" placeholder="Don John" />
          </div>
          <div className="newUserItem">
            <label>Full Name</label>
            <input type="text" placeholder="John Smith" />
          </div>
          <div className="newUserItem">
            <label>Email</label>
            <input type="email" placeholder="john@gmail.com" />
          </div>
          <div className="newUserItem">
            <label>Password</label>
            <input type="password" placeholder="password" />
          </div>
          <div className="newUserItem">
            <label>Phone</label>
            <input type="text" placeholder="+593987959626" />
          </div>
          <div className="newUserItem">
            <label>Dirección</label>
            <input type="text" placeholder="limones y naranjas" />
          </div>
          <div className="newUserItem">
            <label>Ciudad</label>
            <input type="text" placeholder="Ambato" />
          </div>
          <div className="newUserItem">
            <label>Edad</label>
            <input type="text" placeholder="30" />
          </div>
          <div className="newUserItem">
            <label>Gender</label>
            <div className="newUserGender">
              <input type="radio" name="gender" id="male" value="male" />
              <label htmlFor="male">Hombre</label>
              <input type="radio" name="gender" id="female" value="female" />
              <label htmlFor="female">Mujer</label>
              <input type="radio" name="gender" id="other" value="other" />
              <label htmlFor="other">Desconocido</label>
            </div>
          </div>
          {/* <div className="newUserItem">
            <label>Active</label>
            <select className="newUserSelect" name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div> */}
          <button className="newUserButton">Crear Cliente</button>
        </form>
      </div>
    </>
  );
}
