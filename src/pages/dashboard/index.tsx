// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import EcommerceProfit from 'src/views/dashboards/ecommerce/EcommerceProfit'
import EcommerceOrders from 'src/views/dashboards/ecommerce/EcommerceOrders'
import EcommerceExpenses from 'src/views/dashboards/ecommerce/EcommerceExpenses'
import EcommerceEarningReports from 'src/views/dashboards/ecommerce/EcommerceEarningReports'
import EcommerceInvoiceTable from 'src/views/dashboards/ecommerce/EcommerceInvoiceTable'
import EcommerceRevenueReport from 'src/views/dashboards/ecommerce/EcommerceRevenueReport'
import EcommerceGeneratedLeads from 'src/views/dashboards/ecommerce/EcommerceGeneratedLeads'
import EcommercePopularProducts from 'src/views/dashboards/ecommerce/EcommercePopularProducts'
import EcommerceCongratulationsJohn from 'src/views/dashboards/ecommerce/EcommerceCongratulationsJohn'
import EcommerceTransactionsVertical from 'src/views/dashboards/ecommerce/EcommerceTransactionsVertical'
import EcommerceTransactionsHorizontal from 'src/views/dashboards/ecommerce/EcommerceTransactionsHorizontal'
import Icon from 'src/@core/components/icon'
// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import RoleCard from 'src/views/roleCard'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store/store'
import { getDashboardData } from 'src/slice/dashboardSlice'

{
  // / <EcommerceCongratulationsJohn /> /
}
const dashboard = () => {
  const { dashboardData } = useSelector((state: any) => state?.rootReducer?.dashboardReducer)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getDashboardData())
  }, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid gap={4} spacing={6} display='flex' flexWrap='wrap' item xs={12} sm={12}>
          <Grid item xs={12} sm={3.5}>
            <RoleCard roleName={'Number of Farmers'} data={dashboardData?.TotalFarmerCount} />
          </Grid>
          {dashboardData?.allRoleCount?.map((Item: any) => {
            return (
              <Grid item xs={12} sm={3.5}>
                <RoleCard data={Item} />
              </Grid>
            )
          })}
        </Grid>
        <Grid item xs={12} lg={8}>
          <EcommerceRevenueReport data={dashboardData} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <EcommerceGeneratedLeads />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default dashboard
