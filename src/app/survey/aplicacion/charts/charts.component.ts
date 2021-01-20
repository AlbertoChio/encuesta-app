import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/auth/infraestructura/token.service';
import { Survey } from '../../dominio/survey';
import { SurveyService } from '../../infraestructura/survey.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {
  public newProperty = []
  public selectedsfilter =
    {
      segmentationName: "",
      id: 0
    };
  public selectedcategoriesfilter = [
    {
      segmentationitemName: [""],
      id: []
    },
    {
      categoryName: "",
      id: null,
      questions: []
    }
  ];
  public survey: Survey = new Survey();
  public completada: number = 0;
  public nocompletada: number = 0;
  public selectedS = [
    {
      segmentationName: "mujer",
      int: 0
    },
    {
      segmentationName: "hombre",
      int: 0
    }];
  public pieChartColors: Array<any> = [{
    backgroundColor: ['#E74C3C', '#9B59B6', '#3498DB', '#1ABC9C', '#27AE60', '#F1C40F', '#E67E22', '#95A5A6', '#34495E', '#880E4F', '#0E6251', '#7D6608', '#6E2C00', '#1B2631'],
    borderColor: 'transparent'
  }];

  public spieChartColors: Array<any> = [{ backgroundColor: [] }];
  public cbarChartColors: Array<any> = [{ backgroundColor: [] }];
  public pieChartOptions: ChartOptions = {
    responsive: false,
    legend: {
      display: true,
      labels: {
        fontColor: 'black'
      }
    },
    plugins: {
      datalabels: {
        anchor: 'center',
        align: 'center',
        font: {
          size: 15,
          weight: 'bold'
        },
        color: 'white',

      }
    },
    tooltips: {
      backgroundColor: 'black',
      callbacks: {
        labelTextColor: function(tooltipItem, chart) {
          return "white";
        },

      }
    }
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[]=[];
  public pieChartLabels: Label[] = ['completada', 'sin completar'];
  public pieChartData: SingleDataSet = [this.completada, this.nocompletada];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public spieChartLabels = [];
  public spieChartData = [];
  public cpieChartLabels = [];
  public cpieChartData = [];
  public spieChartType: ChartType = 'bar';
  public spieChartLegend = true;
  public spieChartPlugins = [pluginDataLabels];

  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;
  constructor(
    private surveyService: SurveyService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.cargarSurvey();
    this.setsegmentationpiechart();
    this.pieChartColors[0].backgroundColor = this.shuffleArray((this.pieChartColors[0].backgroundColor))
  }

  cargarSurvey(): void {
    const surveyname = this.activatedRoute.snapshot.params.surveyname;
    this.surveyService
      .surveyuserParticipantRequestSurveyChartInfo(surveyname)
      .subscribe(
        data => {
          console.log(data)
          this.survey = new Survey(data);
          this.transformsurveydata();
          this.setparticipationpiechart();
          err => {
            this.survey = null;
            console.log(err);
          }
        }
      );
  }

  public haceralgo(ob) {
    console.log(ob.value);
  }

  public categrychartfilterapplied(nonemptyapplication, index) {
    return nonemptyapplication.segmentationitems.some((e) => (this[0].id).includes(e.segmentationitemId));
  }

  public setcategorychart() {
    this.barChartLabels.length = 0
    this.barChartData[0].data.length = 0
    console.log(this.selectedcategoriesfilter);
    console.log("cambiando grafico");
    if(this.selectedcategoriesfilter[0]['id']!=0 && this.selectedcategoriesfilter[1]['id']>0)
    {
      console.log("pasó condicional");
    this.selectedcategoriesfilter[1].questions.length = 0
    this.survey.categories.forEach((element) => {
      if (element.categoryId == this.selectedcategoriesfilter[1].id) {
        element.questions.forEach((element1) => {
          this.selectedcategoriesfilter[1].questions.push({ 'questionId': element1.questionId, ['questionName']: element1.questionName, ['values']: [] })
        });
      }
    });
    const nonemptyapplications = this.survey.surveyparticipants.map((e) => e.applications).filter((e) => e.length > 0)
    let filteredapplications = []
    nonemptyapplications.forEach(element => {
      filteredapplications.push(element.filter(this.categrychartfilterapplied, this.selectedcategoriesfilter))
    });
    filteredapplications = filteredapplications.filter((e) => e.length > 0)
    this.selectedcategoriesfilter[1].questions.forEach((element, index) => {
      this.barChartLabels.push(element.questionName)
    });
    this.selectedcategoriesfilter[1].questions.forEach((element,indexa) => {
    this.barChartData[0].data.push(0)
      filteredapplications.forEach(element1 => {
        element1.forEach(element2 => {
          element2.applicationHasQuestions.forEach(element3 => {
            if (element3.question.questionId == element.questionId)
              element.values.push(element3.applicationHasQuestionvalue)
          });
        });
      });
      let average = (array) => array.reduce((a, b) => a + b) / array.length;
      this.barChartData[0].data[indexa]=average(element.values.map((e)=>parseInt(e)))
    });
    this.cbarChartColors[0].backgroundColor = this.shuffleArray((this.pieChartColors[0].backgroundColor))
    }
    this.updateChart() ;
  }

  public setsegmentationpiechart() {
    this.spieChartLabels.length = 0
    this.spieChartData.length = 0
    this.survey.segmentations.forEach((element) => {
      if (element.segmentationId == this.selectedsfilter.id) {
        element.segmentationitems.forEach(element1 => {
          this.spieChartLabels.push(element1.segmentationitemName)
          this.spieChartData.push(element1['int']);
        });
      }
    });
    this.spieChartColors[0].backgroundColor = this.shuffleArray(this.pieChartColors[0].backgroundColor)
  }

  public setparticipationpiechart() {
    this.survey.surveyparticipants.forEach(element => { this.completada += element.applications.length });
    this.nocompletada = this.survey.surveyparticipants.length - this.completada;
    this.pieChartData = [this.completada, this.nocompletada];
  }

  public transformsurveydata() {
    this.survey.segmentations.forEach((element, index) => {
      element.segmentationitems.forEach((elementt, indexa) => {
        this.survey.segmentations[index].segmentationitems[indexa] = Object.assign({ int: 0 }, this.survey.segmentations[index].segmentationitems[indexa])
      });
    });
    this.survey.segmentations.forEach((element) => {
      element.segmentationitems.forEach((element1) => {
        this.survey.surveyparticipants.forEach((element2) => {
          element2.applications.forEach((element3) => {
            element3.segmentationitems.forEach((element4) => {
              if (element4.segmentationitemName == element1.segmentationitemName) {
                element1['int'] += 1;
              }
            });
          });
        });
      });
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  public shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  updateChart() {
    this.charts.forEach((child) => {
    child.chart.update()
}); // This re-renders the canvas element.
}
}
