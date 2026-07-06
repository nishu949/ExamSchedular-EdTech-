import { Link } from "react-router-dom";

function Sidebar(){

return(

<div className="sidebar">

<h2>
Admin Panel
</h2>

<ul>

<li>

<Link
to="/"
style={{
color:"white",
textDecoration:"none"
}}
>

Dashboard

</Link>

</li>

<li>

<Link
to="/courses"
style={{
color:"white",
textDecoration:"none"
}}
>

Courses

</Link>

</li>

<li>

<Link
to="/rooms"
style={{
color:"white",
textDecoration:"none"
}}
>

Rooms

</Link>

</li>

<li>

<Link
to="/scheduler"
style={{
color:"white",
textDecoration:"none"
}}
>

Generate

</Link>

</li>

<li>

<Link
to="/student"
style={{
color:"white",
textDecoration:"none"
}}
>

Students

</Link>

</li>

</ul>

</div>

)

}

export default Sidebar