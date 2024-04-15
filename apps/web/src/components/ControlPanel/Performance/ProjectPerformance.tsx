import React from 'react'
import { Card } from '../Card'
import { ReactComponent as ClockIcon } from 'assets/images/icon-clock-2.svg'
import { ReactComponent as ProjectIcon } from 'assets/images/icon-project.svg'
import { ReactComponent as ChartPieIcon } from 'assets/images/icon-chart-pie-solid.svg'
import { toTitleCase } from 'utils/formatters'
import { EntityStatusMap } from 'constants/entity'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

const ProjectPerformance: React.FC = () => {
  const { entityId = "" } = useParams<{ entityId: string }>()
  const { status } = useAppSelector(getEntityById(entityId))

  return (
    <Card
      icon={<ClockIcon />}
      title='Performance'
      columns={1}
      items={[
        {
          icon: <ProjectIcon />,
          content: `Status: ${toTitleCase(EntityStatusMap[status])}`,
        },
        {
          icon: <ChartPieIcon />,
          content: `${(0).toLocaleString()}/${(0).toLocaleString()} distributed`,
        },
      ]}
    />
  )
}

export default ProjectPerformance
