import { Routes } from '@angular/router';
import { ContactGetAllComponent } from "./contact-get-all/contact-get-all.component";
import { ContactReplyComponent } from './contact-reply/contact-reply.component';



export const contactRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'contactGetAll',
        component: ContactGetAllComponent,
      },
      {
        path: 'contactReply/:id',
        component: ContactReplyComponent,
      },
    ],
  },
];
