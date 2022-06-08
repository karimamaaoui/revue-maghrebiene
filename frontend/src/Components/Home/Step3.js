import React, { useState, useEffect } from 'react'

function Step3({ formData, setFormData }) {
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

                   </div>
                   </div>
                   </div>
          </div>
      </div>
      </div>
      </div>
    );
  }
  
  export default Step3;