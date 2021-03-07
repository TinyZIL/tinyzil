import React from 'react'
import dynamic from 'next/dynamic'
import { Rate } from 'shared/rate.interface'
import { Token } from 'shared/token.interface'

const Chart = dynamic(
  () => import('components/Chart'),
  { ssr: false }
)

interface Props {
  token: Token,
  rates: Rate[],
  zilRate: Rate,
}

const TokenRow = (props: Props) => {
  const sortedRates = props.rates.sort((a,b) => (a.time < b.time) ? 1 : -1)
  const lastRate = sortedRates.length > 0 ? sortedRates[0].value : 0
  const firstRate = sortedRates.length > 0 ? sortedRates[sortedRates.length-1].value : 0
  const lastRateRounded = (lastRate > 1) ? Math.round(lastRate * 100) / 100 : Math.round(lastRate * 10000) / 10000
  const usdRate = lastRate * props.zilRate.value

  const change = ((lastRate - firstRate) / firstRate) * 100
  const changeRounded = Math.round(change * 100) / 100

  return (
    <div className="token-row">
      <div className="w-6 mr-3"><img src={props.token.icon} /></div>
      <div className="w-48">{props.token.symbol}</div>
      <div className="w-32">{lastRateRounded}</div>
      <div className="w-32">${usdRate.toFixed(2)}</div>
      <div className={change >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}>
        {changeRounded} %
      </div>
      <div className="flex-grow flex justify-end">
        <div className="w-28 h-16">
          <Chart data={props.rates} isIncrease={change >= 0} isUserInteractionEnabled={false} isScalesEnabled={false} />
        </div>
      </div>
    </div>
  )
}

export default TokenRow