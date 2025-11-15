import React, { useEffect, useState } from 'react'


const PAGE_SIZE =10;

const EmployeeTable = () => {

    const[employees,setEmployees] = useState([]);

    const[curPage,setCurPage] = useState(1);

    useEffect(() => {
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        .then((res) => {
            if(!res.ok){
                throw new Error("Network Response was not ok");
            }
            return res.json();
        })
        .then((data) => setEmployees(data))
        .catch(() => {
            alert("failed to fetch data")
        });
    },[]);

    const totalPages = Math.ceil(employees.length/ PAGE_SIZE);
    const startIndex = (curPage - 1) * PAGE_SIZE;
    const currentEmployees = employees.slice(startIndex, startIndex + PAGE_SIZE);

    const goToNext =() => {
        if(curPage < totalPages){
            setCurPage(curPage +1);
        }
    };

    const goToPrev =() => {
   if(curPage > 1){
    setCurPage(curPage -1);
   }
    }
  return (
    <div>
        <h1 style={{textAlign :"center",margin:"32px 0"}}>
       Employee Data Table
        </h1>

        <table style={{borderCollapse :"collapse",margin:"0 auto",width:"97%"}}>
            <thead>
                <tr style={{background:"#009879",color:"#fff"}}>
                    <th style={{padding:"12px",textAlign:"left"}}>ID</th>
                    <th style={{padding:"12px", textAlign:"left"}}>Name</th>
                    <th style={{padding:"12px",textAlign:"left"}}>Email</th>
                    <th style={{padding:"12px",textAlign:"left"}}>Role</th>
                </tr>
            </thead>
            <tbody>
                {currentEmployees.map((data,idx) => (
                    <tr key={data.id} style={{background:"#fff"}}>
                        <td style={{padding:"12px"}}>{data.id}</td>
                        <td style={{padding:"12px"}}>{data.name}</td>
                        <td style={{padding:"12px"}}>{data.email}</td>
                        <td style={{padding:"12px"}}>{data.role}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div style={{display:"flex",justifyContent:"center",margin:"32px 0 0 0",gap:"10px"}}>
            <button onClick={goToPrev} 
            style={{padding:"8px 24px",
                borderRadius:"7px",
                border:"none",
                background: curPage ===1 ? "#ccc" 
                : "#009879",
                color:"#fff",
                fontWeight:"bold",
                cursor:curPage === 1 ? "not-allowed" : "pointer"
            }}>
            Previous
            </button>

            <span style={{background:"#009879",
                color:"#fff",
                padding:"8px 18px",
                borderRadius:"7px",
                fontWeight:"bold",
                fontWeight:"bold",
                fontSize:"18px",
                margin:"0 8px"
            }}>
            {curPage}
            </span>

            <button onClick={goToNext}  style={{
                padding:"8px 24px",
                borderRadius:"7px",
                border:"none",
                background: curPage === totalPages ? "#ccc" : "#009879",
                color:"#fff",
                fontWeight:"bold",
                cursor: curPage === totalPages ? "not-allowed" : "pointer"
            }}>
                Next

            </button>

        </div>
      
    </div>
  )
}

export default EmployeeTable
