// @flow
import React from 'react'
import { createFragmentContainer } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

import type { IssueListItem_issue } from '__generated__/IssueListItem_issue.graphql'

type Props = {
  issue: IssueListItem_issue,
}

const IssueListItem = (props: Props) => {
  return (
    <li>
      {props.issue.title}
    </li>
  )
}

export default createFragmentContainer(
  IssueListItem,
  {
    issue: graphql`
      fragment IssueListItem_issue on Issue {
        title
      }
    `
  },
)
