import React, { useState, useEffect } from 'react'
function Step7({ formData, setFormData }) {

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
   
                        
                      
    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

  );
}

export default Step7;


