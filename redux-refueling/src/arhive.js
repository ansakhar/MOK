<ul>All refuel events:
{refuels.map(refuel => (
  <li key={refuel.id}>
    {refuel.date+" "} {refuel.km+" "}<span onClick={() => handleOpen(refuel.id)}> open </span>
    <span onClick={() => handleRemove(refuel.id)}> x </span>
  </li>
))}
    <li >
  {"total kilometers driven: "+totalKm+" km"}
  </li>
  <li >
  {"total cost: "+totalCost+" €"}
  </li>
  <li >
  {"average consumption: "+(totalL/totalKm)*100+" L/100km"}
  </li>
</ul>  