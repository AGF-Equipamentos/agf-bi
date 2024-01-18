import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 16px;

  #pivot {
    /* margin: auto; */
    padding: 0 20px 0 20px;
    .dx-scrollable-scroll-content {
      background: RGBA(0, 0, 0, 0.48);
    }
    .dx-scrollbar-horizontal .dx-scrollable-scroll {
      height: 8px;
    }
    .dx-scrollbar-horizontal.dx-scrollbar-hoverable {
      height: 8px;
    }
  }

  #dash {
    margin: auto;
    padding: 0 20px 0 20px;
  }
`;
