import React, { useState, useEffect } from 'react'
function Step6({ formData, setFormData }) {

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
                       
                        
                      
    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>

  );
}

export default Step6;


