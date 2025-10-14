export default function Bridge(props: { className: string }){
  return (
    <div className={`${props.className}`}>
      <p>Reserve composition</p>
      <p>Reserve changes</p>
      <p>Oracle updates</p>
      <p>Volume & Users</p>
    </div>
  )
}