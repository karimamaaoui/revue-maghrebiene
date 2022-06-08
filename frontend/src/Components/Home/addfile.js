import React, { useEffect, useState } from 'react'
import Pdf from "react-to-pdf";

import { Button, Card, Modal, OverlayTrigger, Tab, Tabs, Tooltip } from "react-bootstrap";
import FormPage from './FORM';
import Swal from 'sweetalert2';

export default function AddFile() {


  const [Company_Name, setCompanyName] = useState('');
    const [EQV_Client, setEQVClient] = useState('');
    
    console.log(Company_Name)
    const [Client_Country, setClientCountry] = useState('');
    console.log(Client_Country)
    const [Client_Industry, setClientIndustry] = useState('');
    console.log(Client_Industry)
    const [Shares_Number, setSharesNumber] = useState('');
    console.log(Shares_Number)
    const [Share_Price, setSharePrice] = useState('');
    console.log(Share_Price)
    const [Net_Debt, setNetDebt] = useState('');
    console.log(Net_Debt)
    const [Gross_Profit, setGrossProfit] = useState('');
    console.log(Gross_Profit)
    const [EBIT, setEBIT] = useState('');
    console.log(EBIT)
    const [EBITDA, setEBITDA] = useState('');
    console.log(EBITDA)
    const [Total_Revenue, setTotalRevenue] = useState('');
    console.log(Total_Revenue)
    const [companyInfo, setCompanyInfo] = useState([])

    const handleSubmit = async(e) => {
        console.log("inside handle submit");

        e.preventDefault();
        const data={Company_Name,Client_Country,Client_Industry,EQV_Client,Net_Debt,Gross_Profit,EBIT,EBITDA,Total_Revenue}

        const axios = require('axios');
  const response = await axios.post("http://127.0.0.1:5000/acredius/valuation/api/v.0.1/comparable",
         data
         
         )
         

         .then((res)=>{
            setCompanyInfo(res.data)
            Swal.fire({
                title: "Succces!",
                text: "Company Valuation Done Successfully",
                icon: 'success',
                button: "OK!"
            })
        })
            
            
           
    
        .catch(err=>{
            console.log(err)
            Swal.fire({
                title: "Error!",
                text: "Failed to calculate Valuation",
                icon: 'error',
                button: "OK!"
            });
        })
        // setCompanyInfo(response)
      }
  
      const mama = Object.values(companyInfo);
      console.log(mama)
        console.log (companyInfo)
    const ref = React.createRef();
 

    return (
        <>
<nav className='bg-light' >
<Tabs defaultActiveKey="first" >

<Tab eventKey="first" title="Valuation" >
   
<div class="container">
        <form onSubmit={handleSubmit}>
                <div class="row gutters">
                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">

                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div class="card h-100">
                            <div class="card-body">
                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 class="mb-2 text-primary">Company Information</h6>
                                    </div>
                                    <br />
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Company Name</label>
                                            <input type="text" name="Company_Name"
                                                placeholder="Company Name"
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                class="form-control"/>
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Client Country</label>
                                            <input type="text" name="Client_Country"
                                                placeholder="Client Country"
                                                onChange={(e) => setClientCountry(e.target.value)}
                                                class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Client Industry</label>
                                            <input type="text" name="Client_Industry"
                                                placeholder="Client Industry"
                                                class="form-control"
                                                onChange={(e) => setClientIndustry(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>EQV Client</label>
                                            <input type="text" name="EQV_Client" placeholder="EQV Client"
                                                onChange={(e) => setEQVClient(e.target.value)} class="form-control" />
                                        </div>
                                    </div>



                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Net Debt</label>
                                            <input type="text" name="Net_Debt" placeholder="Net Debt"
                                                class="form-control"
                                                onChange={(e) => setNetDebt(e.target.value)} />
                                        </div>
                                    </div>


                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Gross Profit</label>
                                            <input type="text"
                                                class="form-control"
                                                name="Gross_Profit" placeholder="Gross Profit"
                                                onChange={(e) => setGrossProfit(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>EBIT</label>
                                            <input type="text" name="EBIT" placeholder="EBIT"
                                                onChange={(e) => setEBIT(e.target.value)} class="form-control" />
                                        </div>
                                    </div>


                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>EBITDA</label>
                                            <input type="text"
                                                class="form-control"
                                                name="EBITDA" placeholder="EBITDA"
                                                onChange={(e) => setEBITDA(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Total Revenue</label>
                                            <input type="text"
                                                class="form-control" name="Total_Revenue" placeholder="Total Revenue"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                </div>
                                <br/>
                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="text-right">
                                            <input type="submit" id="submit" value="Submit" name="submit" style={{borderRadius:"5px",padding:"8px", backgroundColor: "#19223a",color:"#fcc008", border: "none" }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
            <div class="receipt-content">
                <div class="container bootstrap snippets bootdey " ref={ref}>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="invoice-wrapper">
                                <div class="intro">
                                    Company : <strong>{mama[0]}</strong>
                                </div>

                                <div class="payment-info">
                                    <div class="row">
                                        <div class="col-sm-5">
                                            <span>Comparable value with EBIT : </span>
                                            <strong>{mama[1]}</strong>
                                        </div>
                                        <div class="col-sm-4 text-right">
                                            <span>Comparable value with EBITDA :</span>
                                            <strong>{mama[2]}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div class="payment-details">
                                    <div class="row">
                                        <div class="col-sm-5">
                                            <span> Comprable value with Sales : </span>
                                            <p>
                                            <strong>{mama[4]}</strong>
                                                <br />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div>
                            <Pdf targetRef={ref} filename="Receive.pdf" >
                    {({ toPdf }) =>

                 <input type="button" value="Export PDF" onClick={toPdf}  style={{borderRadius:"5px",padding:"9px", backgroundColor: "#19223a",color:"#fcc008", border: "none" }}/>
}
                  </Pdf>
                  </div>
               

                            <div class="footer">
                                Copyright © 2022. Acredius
                            </div>
                        </div>
                    </div>
                </div>
            </div>

  
</Tab>



<Tab eventKey="second" title="Dashboard">
<div class="container">
    <FormPage/>
        {/* <form onSubmit={handleSubmit}>
                <div class="row gutters">
                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">

                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div class="card h-100">
                            <div class="card-body">
                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 class="mb-2 text-primary">Company Information</h6>
                                    </div>
                                    <br />
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Revenue N</label>
                                            <input type="text" name="RevenueN"
                                                placeholder="Revenue Numero"
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                class="form-control"/>
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label> Revenue Growth N+1</label>
                                            <input type="text" name="RevenueGrowthN+1"
                                                placeholder="Revenue Growth N+1"
                                                onChange={(e) => setClientCountry(e.target.value)}
                                                class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Revenue Growth N+2</label>
                                            <input type="text" name="RevenueGrowthN+2"
                                                placeholder="Revenue Growth N+2"
                                                class="form-control"
                                                onChange={(e) => setClientIndustry(e.target.value)} />
                                        </div>
                                    </div>
                                    

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Revenue Growth N+3</label>
                                            <input type="text" name="RevenueGrowthN+3" placeholder="Revenue Growth N+3"
                                                onChange={(e) => setEQVClient(e.target.value)} class="form-control" />
                                        </div>
                                    </div>


                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Revenue Growth N+4</label>
                                            <input type="text" name="RevenueGrowthN+4" placeholder="Revenue Growth N+4"
                                                onChange={(e) => setEQVClient(e.target.value)} class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Revenue Growth N+5</label>
                                            <input type="text" name="RevenueGrowthN+5" placeholder="Revenue Growth N+5"
                                                onChange={(e) => setEQVClient(e.target.value)} class="form-control" />
                                        </div>
                                    </div>



                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Gross Margin N+1</label>
                                            <input type="text" name="GrossMarginN+1" placeholder="Gross Margin N+1"
                                                class="form-control"
                                                onChange={(e) => setNetDebt(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Gross Margin N+2</label>
                                            <input type="text" name="GrossMarginN+2" placeholder="Gross Margin N+2"
                                                class="form-control"
                                                onChange={(e) => setNetDebt(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Gross Margin N+3</label>
                                            <input type="text" name="GrossMarginN+3" placeholder="Gross Margin N+3"
                                                class="form-control"
                                                onChange={(e) => setNetDebt(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Gross Margin N+4</label>
                                            <input type="text" name="GrossMarginN+4" placeholder="Gross Margin N+4"
                                                class="form-control"
                                                onChange={(e) => setNetDebt(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Gross Margin N+5</label>
                                            <input type="text" name="GrossMarginN+5" placeholder="Gross Margin N+5"
                                                class="form-control"
                                                onChange={(e) => setNetDebt(e.target.value)} />
                                        </div>
                                    </div>


                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Payroll expenses N+1</label>
                                            <input type="text"
                                                class="form-control"
                                                name="PayrollExpensesN+1" placeholder="Payroll expenses N+1"
                                                onChange={(e) => setGrossProfit(e.target.value)} />
                                        </div>
                                    </div>

                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Payroll expenses N+2</label>
                                            <input type="text"
                                                class="form-control"
                                                name="PayrollExpensesN+2" placeholder="Payroll expenses N+2"
                                                onChange={(e) => setGrossProfit(e.target.value)} />
                                        </div>
                                    </div>

                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Payroll expenses N+3</label>
                                            <input type="text"
                                                class="form-control"
                                                name="PayrollExpensesN+3" placeholder="Payroll expenses N+3"
                                                onChange={(e) => setGrossProfit(e.target.value)} />
                                        </div>
                                    </div>

                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Payroll expenses N+4</label>
                                            <input type="text"
                                                class="form-control"
                                                name="PayrollExpensesN+4" placeholder="Payroll expenses N+4"
                                                onChange={(e) => setGrossProfit(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Payroll expenses N+5</label>
                                            <input type="text"
                                                class="form-control"
                                                name="PayrollExpensesN+5" placeholder="Payroll expenses N+5"
                                                onChange={(e) => setGrossProfit(e.target.value)} />
                                        </div>
                                    </div>


                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other operating expenses N+1</label>
                                            <input type="text" name="Other operating expenses N+1" placeholder="Other operating expenses N+1"
                                                onChange={(e) => setEBIT(e.target.value)} class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other operating expenses N+2</label>
                                            <input type="text" name="Other operating expenses N+2" placeholder="Other operating expenses N+2"
                                                onChange={(e) => setEBIT(e.target.value)} class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other operating expenses N+3</label>
                                            <input type="text" name="Other operating expenses N+3" placeholder="Other operating expenses N+3"
                                                onChange={(e) => setEBIT(e.target.value)} class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other operating expenses N+4</label>
                                            <input type="text" name="Other operating expenses N+4" placeholder="Other operating expenses N+4"
                                                onChange={(e) => setEBIT(e.target.value)} class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other operating expenses N+5</label>
                                            <input type="text" name="Other operating expenses N+5" placeholder="Other operating expenses N+5"
                                                onChange={(e) => setEBIT(e.target.value)} class="form-control" />
                                        </div>
                                    </div>


                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other operating income N</label>
                                            <input type="text"
                                                class="form-control"
                                                name="OtherOperatingIncomeN" placeholder="Other operating income N"
                                                onChange={(e) => setEBITDA(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Property plant and equipment N+1</label>
                                            <input type="text"
                                                class="form-control" name="PropertyplantandequipmentN+1" placeholder="Property plant and equipment N+1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>


                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Property plant and equipment N+2</label>
                                            <input type="text"
                                                class="form-control" name="PropertyplantandequipmentN+2" placeholder="Property plant and equipment N+2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Property plant and equipment N+3</label>
                                            <input type="text"
                                                class="form-control" name="PropertyplantandequipmentN+3" placeholder="Property plant and equipment N+3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Property plant and equipment N+4</label>
                                            <input type="text"
                                                class="form-control" name="PropertyplantandequipmentN+4" placeholder="Property plant and equipment N+4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Property plant and equipment N+5</label>
                                            <input type="text"
                                                class="form-control" name="PropertyplantandequipmentN+5" placeholder="Property plant and equipment N+5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Equipement average life</label>
                                            <input type="text"
                                                class="form-control" name="Equipement average life" placeholder="Equipement average life"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Property plant equipment net</label>
                                            <input type="text"
                                                class="form-control" name="Property plant equipment" placeholder="Property plant equipment net"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Intangible asset N+1</label>
                                            <input type="text"
                                                class="form-control" name="Intangible asset N+1" placeholder="Intangible asset N+1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Intangible asset N+2</label>
                                            <input type="text"
                                                class="form-control" name="Intangible asset N+2" placeholder="Intangible asset N+2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Intangible asset N+3</label>
                                            <input type="text"
                                                class="form-control" name="Intangible asset N+3" placeholder="Intangible asset N+3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Intangible asset N+4</label>
                                            <input type="text"
                                                class="form-control" name="Intangible asset N+4" placeholder="Intangible asset N+4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Intangible asset N+5</label>
                                            <input type="text"
                                                class="form-control" name="Intangible asset N+5" placeholder="Intangible asset N+5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Acquired intangible assets net</label>
                                            <input type="text"
                                                class="form-control" name="Acquired intangible assets net" placeholder="Acquired intangible assets net"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>


                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Financial investment asset N+1</label>
                                            <input type="text"
                                                class="form-control" name="Financial investment asset N+1" placeholder="Financial investment asset N+1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Financial investment asset N+2</label>
                                            <input type="text"
                                                class="form-control" name="Financial investment asset N+2" placeholder="Financial investment asset N+2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Financial investment asset N+3</label>
                                            <input type="text"
                                                class="form-control" name="Financial investment asset N+3" placeholder="Financial investment asset N+3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Financial investment asset N+4</label>
                                            <input type="text"
                                                class="form-control" name="Financial investment asset N+4" placeholder="Financial investment asset N+4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Financial investment asset N+5</label>
                                            <input type="text"
                                                class="form-control" name="Financial investment asset N+5" placeholder="Financial investment asset N+5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Financial assets net</label>
                                            <input type="text"
                                                class="form-control" name="Financial assets net" placeholder="Financial assets net"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Days Sales Outstanding N+1</label>
                                            <input type="text"
                                                class="form-control" name="Days Sales Outstanding N+1" placeholder="Days Sales Outstanding N+1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Days Sales Outstanding N+2</label>
                                            <input type="text"
                                                class="form-control" name="Days Sales Outstanding N+2" placeholder="Days Sales Outstanding N+2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Days Sales Outstanding N+3</label>
                                            <input type="text"
                                                class="form-control" name="Days Sales Outstanding N+3" placeholder="Days Sales Outstanding N+3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Days Sales Outstanding N+4</label>
                                            <input type="text"
                                                class="form-control" name="Days Sales Outstanding N+4" placeholder="Days Sales Outstanding N+4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Days Sales Outstanding N+5</label>
                                            <input type="text"
                                                class="form-control" name="Days Sales Outstanding N+5" placeholder="Days Sales Outstanding N+5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>accounts receivable N</label>
                                            <input type="text"
                                                class="form-control" name="accounts receivable N" placeholder="accounts receivable N"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Days Payable Outstanding N+1</label>
                                            <input type="text"
                                                class="form-control" name="Days Payable Outstanding N+1" placeholder="Days Payable Outstanding N+1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Days Payable Outstanding N+2</label>
                                            <input type="text"
                                                class="form-control" name="Days Payable Outstanding N+2" placeholder="Days Payable Outstanding N+2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Days Payable Outstanding N+3</label>
                                            <input type="text"
                                                class="form-control" name="Days Payable Outstanding N+3" placeholder="Days Payable Outstanding N+3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Days Payable Outstanding N+4</label>
                                            <input type="text"
                                                class="form-control" name="Days Payable Outstanding N+4" placeholder="Days Payable Outstanding N+4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Days Payable Outstanding N+5</label>
                                            <input type="text"
                                                class="form-control" name="Days Payable Outstanding N+5" placeholder="Days Payable Outstanding N+5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>



                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>accounts payable N</label>
                                            <input type="text"
                                                class="form-control" name="accounts payable N" placeholder="accounts payable N"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Income Deposit Security N+1</label>
                                            <input type="text"
                                                class="form-control" name="Income Deposit Security N+1" placeholder="Income Deposit Security N+1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Income Deposit Security N+2</label>
                                            <input type="text"
                                                class="form-control" name="Income Deposit Security N+2" placeholder="Income Deposit Security N+2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Income Deposit Security N+3</label>
                                            <input type="text"
                                                class="form-control" name="Income Deposit Security N+3" placeholder="Income Deposit Security N+3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Income Deposit Security N+4</label>
                                            <input type="text"
                                                class="form-control" name="Income Deposit Security N+4" placeholder="Income Deposit Security N+4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Income Deposit Security N+5</label>
                                            <input type="text"
                                                class="form-control" name="Income Deposit Security N+5" placeholder="Income Deposit Security N+5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>


                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Inventory N</label>
                                            <input type="text"
                                                class="form-control" name="Inventory N" placeholder="Inventory N"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other current assets N+1</label>
                                            <input type="text"
                                                class="form-control" name="Other current assets N+1" placeholder="Other current assets N+1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>


                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other current assets N+2</label>
                                            <input type="text"
                                                class="form-control" name="Other current assets N+2" placeholder="Other current assets N+2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other current assets N+3</label>
                                            <input type="text"
                                                class="form-control" name="Other current assets N+3" placeholder="Other current assets N+3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other current assets N+4</label>
                                            <input type="text"
                                                class="form-control" name="Other current assets N+4" placeholder="Other current assets N+4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other current assets N+5</label>
                                            <input type="text"
                                                class="form-control" name="Other current assets N+5" placeholder="Other current assets N+5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>


                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other current assets N</label>
                                            <input type="text"
                                                class="form-control" name="Other current assets N" placeholder="Other current assets N"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>


                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other current liabilities N+1</label>
                                            <input type="text"
                                                class="form-control" name="Other current liabilities N+1" placeholder="Other current liabilities N+1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other current liabilities N+2</label>
                                            <input type="text"
                                                class="form-control" name="Other current liabilities N+2" placeholder="Other current liabilities N+2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other current liabilities N+3</label>
                                            <input type="text"
                                                class="form-control" name="Other current liabilities N+3" placeholder="Other current liabilities N+3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other current liabilities N+4</label>
                                            <input type="text"
                                                class="form-control" name="Other current liabilities N+4" placeholder="Other current liabilities N+4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other current liabilities N+5</label>
                                            <input type="text"
                                                class="form-control" name="Other current liabilities N+5" placeholder="Other current liabilities N+5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Tax rate</label>
                                            <input type="text"
                                                class="form-control" name="Tax rate" placeholder="Tax rate"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Tax comparable 1</label>
                                            <input type="text"
                                                class="form-control" name="Tax comparable 1" placeholder="Tax comparable 1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Tax comparable 2</label>
                                            <input type="text"
                                                class="form-control" name="Tax comparable 2" placeholder="Tax comparable 2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Tax comparable 3</label>
                                            <input type="text"
                                                class="form-control" name="Tax comparable 3" placeholder="Tax comparable 3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Tax comparable 4</label>
                                            <input type="text"
                                                class="form-control" name="Tax comparable 4" placeholder="Tax comparable 4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Tax comparable 5</label>
                                            <input type="text"
                                                class="form-control" name="Tax comparable 5" placeholder="Tax comparable 5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Pretax profit comparable 1</label>
                                            <input type="text"
                                                class="form-control" name="Pretax profit comparable 1" placeholder="Pretax profit comparable 1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Pretax profit comparable 2</label>
                                            <input type="text"
                                                class="form-control" name="Pretax profit comparable 2" placeholder="Pretax profit comparable 2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Pretax profit comparable 3</label>
                                            <input type="text"
                                                class="form-control" name="Pretax profit comparable 3" placeholder="Pretax profit comparable 3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Pretax profit comparable 4</label>
                                            <input type="text"
                                                class="form-control" name="Pretax profit comparable 4" placeholder="Pretax profit comparable 4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Pretax profit comparable 5</label>
                                            <input type="text"
                                                class="form-control" name="Pretax profit comparable 5" placeholder="Pretax profit comparable 5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Observed beta comparable 1</label>
                                            <input type="text"
                                                class="form-control" name="Observed beta comparable 1" placeholder="Observed beta comparable 1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Observed beta comparable 2</label>
                                            <input type="text"
                                                class="form-control" name="Observed beta comparable 2" placeholder="Observed beta comparable 2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Observed beta comparable 3</label>
                                            <input type="text"
                                                class="form-control" name="Observed beta comparable 3" placeholder="Observed beta comparable 3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Observed beta comparable 4</label>
                                            <input type="text"
                                                class="form-control" name="Observed beta comparable 4" placeholder="Observed beta comparable 4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Observed beta comparable 5</label>
                                            <input type="text"
                                                class="form-control" name="Observed beta comparable 5" placeholder="Observed beta comparable 5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Debt comparable 1</label>
                                            <input type="text"
                                                class="form-control" name="Debt comparable 1" placeholder="Debt comparable 1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>


                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Debt comparable 2</label>
                                            <input type="text"
                                                class="form-control" name="Debt comparable 2" placeholder="Debt comparable 2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Debt comparable 3</label>
                                            <input type="text"
                                                class="form-control" name="Debt comparable 3" placeholder="Debt comparable 3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Debt comparable 4</label>
                                            <input type="text"
                                                class="form-control" name="Debt comparable 4" placeholder="Debt comparable 4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Debt comparable 5</label>
                                            <input type="text"
                                                class="form-control" name="Debt comparable 5" placeholder="Debt comparable 5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>



                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Cash comparable 1</label>
                                            <input type="text"
                                                class="form-control" name="Cash comparable 1" placeholder="Cash comparable 1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Cash comparable 2</label>
                                            <input type="text"
                                                class="form-control" name="Cash comparable 2" placeholder="Cash comparable 2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Cash comparable 3</label>
                                            <input type="text"
                                                class="form-control" name="Cash comparable 3" placeholder="Cash comparable 3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Cash comparable 4</label>
                                            <input type="text"
                                                class="form-control" name="Cash comparable 4" placeholder="Cash comparable 4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Cash comparable 5</label>
                                            <input type="text"
                                                class="form-control" name="Cash comparable 5" placeholder="Cash comparable 5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Diluted shares comparable 1</label>
                                            <input type="text"
                                                class="form-control" name="Diluted shares comparable 1" placeholder="Diluted shares comparable 1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Diluted shares comparable 2</label>
                                            <input type="text"
                                                class="form-control" name="Diluted shares comparable 2" placeholder="Diluted shares comparable 2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Diluted shares comparable 3</label>
                                            <input type="text"
                                                class="form-control" name="Diluted shares comparable 3" placeholder="Diluted shares comparable 3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                  
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Diluted shares comparable 4</label>
                                            <input type="text"
                                                class="form-control" name="Diluted shares comparable 4" placeholder="Diluted shares comparable 4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Diluted shares comparable 5</label>
                                            <input type="text"
                                                class="form-control" name="Diluted shares comparable 5" placeholder="Diluted shares comparable 5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Share price comparable 1</label>
                                            <input type="text"
                                                class="form-control" name="Share price comparable 1" placeholder="Share price comparable 1"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Share price comparable 2</label>
                                            <input type="text"
                                                class="form-control" name="Share price comparable 2" placeholder="Share price comparable 2"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Share price comparable 3</label>
                                            <input type="text"
                                                class="form-control" name="Share price comparable 3" placeholder="Share price comparable 3"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Share price comparable 4</label>
                                            <input type="text"
                                                class="form-control" name="Share price comparable 4" placeholder="Share price comparable 4"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Share price comparable 5</label>
                                            <input type="text"
                                                class="form-control" name="Share price comparable 5" placeholder="Share price comparable 5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>



                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Share price comparable 5</label>
                                            <input type="text"
                                                class="form-control" name="Share price comparable 5" placeholder="Share price comparable 5"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>


                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Risk free rate</label>
                                            <input type="text"
                                                class="form-control" name="Risk free rate" placeholder="Risk free rate"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Alpha</label>
                                            <input type="text"
                                                class="form-control" name="Alpha" placeholder="Alpha"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>CRP</label>
                                            <input type="text"
                                                class="form-control" name="CRP" placeholder="CRP"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>ERP</label>
                                            <input type="text"
                                                class="form-control" name="ERP" placeholder="ERP"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Cost of debt</label>
                                            <input type="text"
                                                class="form-control" name="Cost of debt" placeholder="Cost of debt"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Overdraft N</label>
                                            <input type="text"
                                                class="form-control" name="Overdraft N" placeholder="Overdraft N"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other interest bearing debt N</label>
                                            <input type="text"
                                                class="form-control" name="Other interest bearing debt N" placeholder="Other interest bearing debt N"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Other longterm liabilities N</label>
                                            <input type="text"
                                                class="form-control" name="Other longterm liabilities N" placeholder="Other longterm liabilities N"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>Cash and cash equivalent N</label>
                                            <input type="text"
                                                class="form-control" name="Cash and cash equivalent N" placeholder="Cash and cash equivalent N"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>g</label>
                                            <input type="text"
                                                class="form-control" name="g" placeholder="g"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label>ebitda multiple</label>
                                            <input type="text"
                                                class="form-control" name="ebitda multiple" placeholder="ebitda multiple"
                                                onChange={(e) => setTotalRevenue(e.target.value)} />
                                        </div>
                                    </div>
                                    









                                </div>
                                <br/>
                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="text-right">
                                            <input type="submit" id="submit" value="Submit" name="submit" style={{borderRadius:"5px",padding:"8px", backgroundColor: "#19223a",color:"#fcc008", border: "none" }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </form> */}
            </div>
  
</Tab>
</Tabs>
</nav>
</>
    )}

   