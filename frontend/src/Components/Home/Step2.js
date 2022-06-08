
                      

                        
                    
import React, { useState, useEffect } from 'react'
function Step2({ formData, setFormData }) {


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



  return (
    <div className="sign-up-container" style={{ backgroundColor: 'white' }}>
    <div class="container mt-5">

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

                       
                 </div>
                 </div>
                 </div>
        </div>
    </div>
    </div>
    </div>
  );
}

export default Step2;


