import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Routing Imports */
import { Route } from '../core/route/route.service';

/** Translation Imports */
import { extract } from '../core/i18n/i18n.service';
import { OrganisationComponent } from './organisation.component';
import { OfficesComponent } from './offices/offices.component';
import { CreateOfficeComponent } from './offices/create-office/create-office.component';
import { EditOfficeComponent } from './offices/edit-office/edit-office.component';
import { ViewOfficeComponent } from './offices/view-office/view-office.component';
import { ViewOfficeResolver } from './offices/view-office/view-office.resolver';

const routes: Routes = [
  Route.withShell([
    {
      path: 'organisation',
      data: { title: extract('Organisation') },
      children: [
        {
          path: '',
          component: OrganisationComponent,
          data: { title: extract('Organisation'), breadcrumb: 'Organisation' }
        },
        {
          path: 'manage-offices',
          children: [
            {
              path: '',
              component: OfficesComponent,
              data: { title: extract('Manage Offices'), breadcrumb: 'Manage Offices' }
            },
            {
              path: 'create',
              component: CreateOfficeComponent,
              data: { title: extract('Create office'), breadcrumb: 'Create Office' }
            },
            {
              path: 'view/:id',
              data: { title: extract('View Office'), routeParamBreadcrumb: 'id' },
              resolve: {
                office: ViewOfficeResolver
              },
              children: [
                {
                  path: '',
                  component: ViewOfficeComponent,
                },
                {
                  path: 'edit',
                  component: EditOfficeComponent,
                  data: {
                    title: extract('Edit Office'), breadcrumb: 'Edit', routeParamBreadcrumb: false
                  }
                }
              ]
            },
          ],
        }
      ]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ViewOfficeResolver
  ]
})
export class OrganisationRoutingModule { }
