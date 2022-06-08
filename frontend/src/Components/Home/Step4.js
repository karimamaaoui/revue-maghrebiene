import React, { useState, useEffect } from 'react'

function Step4({ formData, setFormData }) {
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


                   </div>
                   </div>
                   </div>
          </div>
      </div>
      </div>
      </div>
    );
  }
  
  export default Step4;