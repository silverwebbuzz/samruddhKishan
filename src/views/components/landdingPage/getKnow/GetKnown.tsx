import React, { SyntheticEvent, useState } from 'react'
import { Box, Grid } from '@mui/material'
import CountUp from 'react-countup'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import VisibilitySensor from 'react-visibility-sensor'
import Icon from 'src/@core/components/icon'
const GetToKnow = ({ DATA, JSONHandler }: any) => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [viewPortEntered, setViewPortEntered] = useState(false)
  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
    console.log('@@@@', isExpanded, panel, isExpanded ? panel : false)
  }
  return (
    <>
      <section className='get-to-know sec_padding'>
        <Grid container style={{ alignItems: 'center' }}>
          <Grid sm={12} md={5} style={{ position: 'relative' }}>
            <Box className='get-to-know-left'>
              <img className='get-to-know-img' src={DATA?.qaContentMainImg} alt='slider6' />
              <img className='get-to-know-img2' src='/images/logo/22.png' alt='slider6' />
            </Box>
            <Box className='get_to_know_btm'>
              <div className='get_to_know_btm_left'>
                <img src={DATA?.qaContentlogo} alt='d' width={'90px'} />
              </div>
              <div className='get_to_know_btm_right'>
                <div className='timer'>
                  <CountUp end={DATA?.qaContentCounter} duration={2} suffix='K'>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor active={!viewPortEntered} onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </div>
                <p>{DATA?.qaContentCounterText}</p>
              </div>
            </Box>
          </Grid>
          <Grid sm={12} md={7}>
            <Box className='get-to-know-right'>
              <p className='get-to-know-heading'>{DATA?.qaContentSubHeader}</p>
              <h1 className='get-to-know-content'>{DATA?.qaContentMainHeader}</h1>
              <div>
                {JSONHandler(DATA?.userQA).map((Item: any) => {
                  return (
                    <Accordion
                      className='accordion-main'
                      expanded={expanded === Item?.positionId}
                      onChange={handleChange(Item?.positionId)}
                    >
                      <AccordionSummary
                        id='controlled-panel-header-1'
                        aria-controls='controlled-panel-content-1'
                        expandIcon={<Icon fontSize='1.25rem' icon='tabler:chevron-down' />}
                      >
                        <h4 className='get-col-heading'>{Item?.userQuestion}</h4>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className='get-col-text'>{Item?.userAnswer}</p>
                      </AccordionDetails>
                    </Accordion>
                  )
                })}
              </div>
            </Box>
          </Grid>
        </Grid>
      </section>
    </>
  )
}

export default GetToKnow
