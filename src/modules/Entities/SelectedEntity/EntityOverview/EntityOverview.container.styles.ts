import styled from 'styled-components'

export const SidebarWrapper = styled.div`
  background: #dfe7f4;
`

export const MainPanelWrapper = styled.div`
  &&& {
    @media (min-width: 992px) {
      padding-left: 8rem;
    }
  }
`

export const OverviewContainer = styled.section`
  background: white;
  color: black;
  padding-bottom: 40px;
  line-height: 2;
  hr {
    border: 1px solid #e8edee;
    width: 7.5rem;
    margin: 3.75rem auto;
    border-radius: 2px;
  }
  img {
    max-width: 100%;
  }
  h2 {
    margin: 2rem 0;
  }
  h3 {
    font-size: 1.375rem;
    font-weight: bold;
    font-family: ${(props: any): string => props.theme.fontRoboto};
    margin: 0.75rem 0;
  }
`