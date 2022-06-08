import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listTypes } from '../../redux/Actions/typeAction';
import { listAttribute } from '../../redux/Actions/attributeActions';
import { listRules } from '../../redux/Actions/rulesActions';
import { Form } from 'react-bootstrap';
function Step1({ formData, setFormData }) {

  const [checked, setChecked] = useState([]);
  const history = useNavigate();
  const dispatch = useDispatch();

  const typeList = useSelector((state) => state.typeList);
  const { loading, error, types } = typeList;

  // const attributeList = useSelector((state) => state.attributeList);
  // const { loadingAttribute, errorAttribute, attributes } = attributeList;

  // const getAllRule = useSelector((state) => state.getAllRule);
  // const { loadingRule, errorRule, rules } = getAllRule;

  // console.log("rules", rules)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
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



  useEffect(() => {
    dispatch(listTypes());
    //    dispatch(listAttribute());
    //  dispatch(listRules())

    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
  ]);

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
                   
    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>

  );
}

export default Step1;


