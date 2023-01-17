import { PieChart, Pie, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Label, LabelList, Cell } from 'recharts';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchases } from '../features/purchases/purchaseSlice';


const platforms = ['Kanopy', 'Swank', 'Films on Demand', 'Direct from Distributor', 'Netflix', 'Hulu', 'Amazon Prime Video', 'Disney+', 'Paramount+', 'Self-hosted', 'Other'];

const data01 = [
    { name: 'Group A', value: 1000 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
  ];
  
  const data02 = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 },
    { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 },
    { name: 'Group F', value: 4800 },
  ];

const COLORS = ['red', 'blue', 'green', 'orange', 'darkBlue', 'indigo', 'violet', 'maroon', 'gold', 'lightBlue', 'black' ];

const MyChart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const { purchases, isError, message } = useSelector((state) => state.purchases)

  const data03 = platforms.map(platform => {
    let totalForPlatform = purchases.filter(purchase => {
      return purchase.platform === platform
    }).length
    return {name: platform, value: totalForPlatform}
  })

//   const RADIAN = Math.PI / 180;
// const insideLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, value }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {value ? value : ""}
//     </text>
//   );
// };



  useEffect(() => {

    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getPurchases());
    console.log(data03)

  }, [user, navigate, isError, message, dispatch])

  const outsideLabel = (entry) => {
    if (entry.value){
      return entry.name
    } else {
      return
    }
  }
  const insideLabel = (entry) => {
    if (entry.value){
      return entry.value
    } else {
      return
    }
  }

  return (
    <div>
      <h1>Streaming Licenses per Platform</h1>
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <PieChart width={500} height={500}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data03.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="darkBlue"
          label={outsideLabel}
          labelLine={false}
          nameKey="name"
        >
        <LabelList
          dataKey={insideLabel}
          style={{fontSize: "20px"}}
          dy={-3}
          fill="white" // Percentage color
          // dataKey="percentage"
          position="inside"
          angle="0"
          stroke="none" // Border of letters
        />
        {data03.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <Legend />
      </PieChart>
      <BarChart
          width={1000}
          height={500}
          data={data03.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 100,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" padding={{ left: 10, right: 10 }} textAnchor="end" scaleToFit='true' verticalAnchor="start" interval={0} angle="-40" stroke="darkBlue"/>
          <YAxis label={{ value: '# of Licenses', angle: -90, position: 'left' }} stroke="darkBlue"/>
          <Tooltip />
          <LabelList position="left">Number of Licenses</LabelList>
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="darkBlue" background={{ fill: '#eee' }} />
        </BarChart>
    </div>
    </div>
  )
}

export default MyChart