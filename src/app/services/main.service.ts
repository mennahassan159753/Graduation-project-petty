import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  githubUsername = 'mennahassan159753';
  repositoryName = 'Petty-data';
  personalAccessToken = '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';
  branchName = 'main';

  private langChangeSubject = new BehaviorSubject<string>(this.getLang());
  langChange$ = this.langChangeSubject.asObservable();

  constructor(private toastr: ToastrService, private http: HttpClient) {}

  setLang(lang: string) {
    localStorage.setItem('lang', lang);
    this.langChangeSubject.next(lang);
  }

  getLang(): string {
    return localStorage.getItem('lang') || 'ar';
  }
  // UTF-8 to Base64 encoding function
  utf8ToBase64(str: string): string {
    const bytes = new TextEncoder().encode(str);
    return btoa(String.fromCharCode(...new Uint8Array(bytes.buffer)));
  }

  // Base64 to UTF-8 decoding function
  base64ToUtf8(str: string): string {
    const bytes = Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  getAllData(filePath: string) {
    const urlWithParams = `https://api.github.com/repos/${
      this.githubUsername
    }/${
      this.repositoryName
    }/contents/${filePath}?timestamp=${new Date().getTime()}`;
    return this.http.get<any[]>(urlWithParams);
  }

  addItemToJSON(filePath: string, item: any, callback: () => void) {
    this.http
      .get(
        `https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`,
        {
          headers: new HttpHeaders({
            Authorization: `token ${this.personalAccessToken}`,
          }),
        }
      )
      .subscribe(
        (data: any) => {
          const decodedContent = this.base64ToUtf8(data.content);

          const existingItems = JSON.parse(decodedContent);
          existingItems.push(item);

          const encodedContent = this.utf8ToBase64(
            JSON.stringify(existingItems, null, 2)
          );

          const body = {
            message: 'Add new item',
            content: encodedContent,
            sha: data.sha,
            branch: this.branchName,
          };

          this.http
            .put(
              `https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`,
              body,
              {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  Authorization: `token ${this.personalAccessToken}`,
                }),
              }
            )
            .subscribe(
              () => {
                callback();
              },
              (error) => {
                this.toastr.error('Failed:', 'Error');
              }
            );
        },
        (error) => {
          console.error('Error fetching JSON:', error);
        }
      );
  }

  updateItemInJSON(
    filePath: string,
    itemId: any,
    updatedItem: any,
    callback: () => void
  ) {
    this.http
      .get(
        `https://api.github.com/repos/${this.githubUsername}/${
          this.repositoryName
        }/contents/${filePath}?timestamp=${new Date().getTime()}`,
        {
          headers: new HttpHeaders({
            Authorization: `token ${this.personalAccessToken}`,
          }),
        }
      )
      .subscribe(
        (data: any) => {
          const decodedContent = this.base64ToUtf8(data.content);

          let existingItems = JSON.parse(decodedContent);
          const index = existingItems.findIndex(
            (item: any) => item.id === itemId
          );

          if (index !== -1) {
            existingItems[index] = updatedItem;

            const encodedContent = this.utf8ToBase64(
              JSON.stringify(existingItems, null, 2)
            );

            const body = {
              message: 'Update item',
              content: encodedContent,
              sha: data.sha,
              branch: this.branchName,
            };

            this.http
              .put(
                `https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`,
                body,
                {
                  headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `token ${this.personalAccessToken}`,
                  }),
                }
              )
              .subscribe(
                () => {
                  callback();
                },
                (error) => {
                  console.error('Failed to update item:', error);
                }
              );
          }
        },
        (error) => {
          console.error('Error fetching JSON:', error);
        }
      );
  }

  deleteItemFromJSON(filePath: string, itemId: number, callback: () => void) {
    this.http
      .get(
        `https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`,
        {
          headers: new HttpHeaders({
            Authorization: `token ${this.personalAccessToken}`,
          }),
        }
      )
      .subscribe(
        (data: any) => {
          const decodedContent = this.base64ToUtf8(data.content);

          let existingItems = JSON.parse(decodedContent);
          const index = existingItems.findIndex(
            (item: any) => item.id === itemId
          );

          if (index !== -1) {
            existingItems.splice(index, 1);

            const encodedContent = this.utf8ToBase64(
              JSON.stringify(existingItems, null, 2)
            );

            const body = {
              message: 'Delete item',
              content: encodedContent,
              sha: data.sha,
              branch: this.branchName,
            };

            this.http
              .put(
                `https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`,
                body,
                {
                  headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `token ${this.personalAccessToken}`,
                  }),
                }
              )
              .subscribe(
                () => {
                  callback();
                },
                (error) => {
                  console.error('Failed to delete item:', error);
                }
              );
          } else {
            console.log('Item not found.');
          }
        },
        (error) => {
          console.error('Error fetching JSON:', error);
        }
      );
  }
}

// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

// @Injectable({
//     providedIn: 'root'
// })
// export class MainService {
//     githubUsername = 'Ali8970';
//     repositoryName = 'Graduation-project-data';
//     branchName = 'main';
//     personalAccessToken = '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';
//     constructor(private http: HttpClient, private toastr: ToastrService) { }

//     getAllData(filePath: string) {
//         const urlWithParams = `https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}` + `?timestamp=${new Date().getTime()}`;
//         return this.http.get<any[]>(urlWithParams);
//     }

//     addItemToJSON(filePath: string, item: any, callback: () => void) {
//         this.http.get(`https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`, {
//             headers: new HttpHeaders({
//                 Authorization: `token ${this.personalAccessToken}`
//             })
//         }).subscribe((data: any) => {

//             const decodedContent = atob(data.content);

//             const existingItems = JSON.parse(decodedContent);

//             existingItems.push(item);

//             const encodedContent = btoa(JSON.stringify(existingItems, null, 2));
//             const body = {
//                 message: 'Add new item',
//                 content: encodedContent,
//                 sha: data.sha,
//                 branch: this.branchName
//             };

//             this.http.put(`https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`, body, {
//                 headers: new HttpHeaders({
//                     'Content-Type': 'application/json',
//                     Authorization: `token ${this.personalAccessToken}`
//                 })
//             }).subscribe(() => {
//                 callback();
//             }, (error) => {
//                 debugger
//                 this.toastr.error('Failed:', 'Error');
//             });
//         }, (error) => {
//             console.error('Error fetching JSON:', error);
//         });
//     }
//     updateItemInJSON(filePath: string, itemId: any, updatedItem: any, callback: () => void) {
//         this.http.get(`https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}` + `?timestamp=${new Date().getTime()}`, {
//             headers: new HttpHeaders({
//                 Authorization: `token ${this.personalAccessToken}`
//             })
//         }).subscribe((data: any) => {
//             const decodedContent = atob(data.content);

//             let existingItems = JSON.parse(decodedContent);

//             const index = existingItems.findIndex((item: any) => item.id === itemId);

//             existingItems[index] = updatedItem;

//             const encodedContent = btoa(JSON.stringify(existingItems, null, 2)); // Encode content to base64

//             const body = {
//                 message: 'Update item',
//                 content: encodedContent,
//                 sha: data.sha,
//                 branch: this.branchName
//             };

//             this.http.put(`https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`, body, {
//                 headers: new HttpHeaders({
//                     'Content-Type': 'application/json',
//                     Authorization: `token ${this.personalAccessToken}`
//                 })
//             }).subscribe(() => {
//                 callback();
//             }, (error) => {
//                 console.error('Failed to update item:', error);
//             });

//         }, (error) => {
//             console.error('Error fetching JSON:', error);
//         });
//     }

//     deleteItemFromJSON(filePath: string, itemId: number, callback: () => void) {
//         this.http.get(`https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`, {
//             headers: new HttpHeaders({
//                 Authorization: `token ${this.personalAccessToken}`
//             })
//         }).subscribe((data: any) => {
//             const decodedContent = atob(data.content);
//             let existingItems = JSON.parse(decodedContent);

//             const index = existingItems.findIndex((item: any) => item.id === itemId);

//             if (index !== -1) {
//                 existingItems.splice(index, 1);

//                 const encodedContent = btoa(JSON.stringify(existingItems, null, 2));

//                 const body = {
//                     message: 'Delete item',
//                     content: encodedContent,
//                     sha: data.sha,
//                     branch: this.branchName
//                 };

//                 this.http.put(`https://api.github.com/repos/${this.githubUsername}/${this.repositoryName}/contents/${filePath}`, body, {
//                     headers: new HttpHeaders({
//                         'Content-Type': 'application/json',
//                         Authorization: `token ${this.personalAccessToken}`
//                     })
//                 }).subscribe(() => {
//                     callback();

//                 }, (error) => {
//                     console.error('Failed to delete item:', error);
//                 });
//             } else {
//                 console.log('Item not found.');
//             }
//         }, (error) => {
//             console.error('Error fetching JSON:', error);
//         });
//     }
// }
