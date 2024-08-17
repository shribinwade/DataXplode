import { RouterLink } from "@angular/router";
import { INavbarData } from "./helper";

export const navbarData :INavbarData[] = [ 
      {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label: 'Dashboard'
      },
      // {
      //   routeLink: 'services',
      //   icon: 'fal fa-box-open',
      //   label: 'Services',
      //   items: [
      //       {
      //           routeLink: 'ai_web',
      //           label: 'AI Web'
      //       },
      //       {
      //           routeLink: 'automation',
      //           label: 'Automation'
      //       },
      //       {
      //           routeLink: 'analytics',
      //           label: 'Analytics'
      //       },
      //       {
      //         routeLink: 'competitor-analyzer',
      //         label: 'Competitor Analyzer'
      //       }
      //   ]
      // },
      {
        routeLink: 'tools',
        icon: 'fal fa-tools',
        label: 'Analysis Tool',
        items: [
                 {
                    routeLink: 'tools/mi_tools',
                    label: 'Market Intelligence'
                 },
                //  {
                //     routeLink: 'tools/price_optimization',
                //     label: 'Price Optimization'
                //  },
                //  {
                //     routeLink: 'tools/sentiment_analysis',
                //     label: 'Sentiment Analysis'
                //  }
        ]
      },
      // {
      //   routeLink: 'services/statistics',
      //   icon: 'fal fa-chart-line',
      //   label: 'Statistics'
      // },
      // {
      //   routeLink: 'services/prices',
      //   icon: '	fas fa-rupee-sign',
      //   label: 'price'
      // },
      {
        routeLink: 'services/contact',
        icon: 'fas fa-phone-alt',
        label: 'Contact'
      },
      {
        routeLink: 'services/about',
        icon: ' fa-people-group',
        label: 'About Us'
      },
    
];